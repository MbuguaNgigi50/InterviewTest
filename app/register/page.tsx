import { Metadata } from "next";

import { UserRegisterAuthForm } from "@/components/registerform";

export const metadata: Metadata = {
	title: "Register Account",
};

export default function RegisterPage() {
	return (
		<>
			<div className='relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<div className='lg:p-8'>
					<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-2xl font-semibold tracking-tight'>
								Register
							</h1>
							<p className='text-sm text-muted-foreground'>
								Enter your email and password below to continue
							</p>
						</div>
                        <UserRegisterAuthForm />
					</div>
				</div>
			</div>
		</>
	);
}
