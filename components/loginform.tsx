"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Form } from "./ui/form";

import toast from 'react-hot-toast';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { LoginFormSchema } from '@/schemas';

interface UserLoginAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginAuthForm({
	className,
	...props
}: UserLoginAuthFormProps) {
	const [isPending, startTransition] = React.useTransition();

	const router = useRouter();

    const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
		startTransition(() => {
			login(values)
				.then((callback) => {
					if (!callback?.error) {
						toast.success("Login Successful");
						router.push("/view-data");
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
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
					</div>
					<Button 
                    disabled={isPending}
                    type="submit"
                    >
						Sign In
					</Button>
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
