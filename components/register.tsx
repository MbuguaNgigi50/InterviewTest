"use client";

import { RegistrationFormSchema } from "@/schemas";
import * as z from 'zod'
import * as React from 'react'
import { register } from "@/actions/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//Shad-cn Packages
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {
	const [isPending, startTransition] = React.useTransition();

	const router = useRouter();

	const form = useForm<z.infer<typeof RegistrationFormSchema>>({
		resolver: zodResolver(RegistrationFormSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	function onRegister(values: z.infer<typeof RegistrationFormSchema>){
		startTransition(() => {
			register(values)
				.then((callback) => {
					if (!callback?.error) {
						toast.success("Registration Successful");
						router.push("/login");
					}
					if (callback?.error) {
						toast.error(callback.error);
					}
				})
				.finally(() => {
					setTimeout(() => {}, 3000);
				});
		});
	};

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onRegister)} className='space-y-6'>
					<div className='grid gap-2'>
						<div className='grid gap-1'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												id='email'
												placeholder='Email'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												id='password'
												placeholder='Password'
												type='password'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												id='confirmPassword'
												placeholder='Confirm Password'
												type='password'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' disabled={isPending}>
							Register
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
