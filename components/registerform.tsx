"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Form } from "./ui/form";

import toast from 'react-hot-toast';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { RegistrationFormSchema } from "@/schemas";

interface UserLoginAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterAuthForm({
	className,
	...props
}: UserLoginAuthFormProps) {
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

	const onSubmit = (values: z.infer<typeof RegistrationFormSchema>) => {
		startTransition(() => {
			register(values)
				.then((callback) => {
					if (callback.success && !callback?.error) {
						toast.success(callback.success);
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
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='grid gap-2'>
						<div className='grid gap-1'>
							<Label className='sr-only' htmlFor='email'>
								Email
							</Label>
							<Input
								id='email'
								placeholder='Email'
								type='email'
								disabled={isPending}
								required
							/>
							<Input
								id='password'
								placeholder='Password'
								type='password'
								disabled={isPending}
								required
							/>
							<Input
								id='confirmPassword'
								placeholder='Confirm Password'
								type='password'
								disabled={isPending}
								required
							/>
						</div>
						<Button disabled={isPending} type="submit">Register</Button>
					</div>
				</form>
			</Form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
			</div>
		</div>
	);
}
