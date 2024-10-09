import { Metadata } from "next";

import { UserLoginAuthForm } from "@/components/loginform";

export const metadata: Metadata = {
	title: "Login to your Account",
	description: "Login Flow.",
};

export default function LoginPage() {
	return (
		<>
			<div className='relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<div className='lg:p-8'>
					<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-2xl font-semibold tracking-tight'>
								Sign In
							</h1>
							<p className='text-sm text-muted-foreground'>
								Enter your email and password below to continue
							</p>
						</div>
                        <UserLoginAuthForm />
					</div>
				</div>
			</div>
		</>
	);
}
