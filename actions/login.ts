"use server";

import * as z from "zod";

import { LoginFormSchema } from "@/schemas";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/users";


export const login = async (values: z.infer<typeof LoginFormSchema>) => {
	const validatedFields = LoginFormSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Something Went Wrong",
		};
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return {
			error: "Email Does Not Exist",
		};
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/home",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CallbackRouteError":
					return {
						error: "Invalid Credentials",
					};
				default:
					return {
						error: "Something Went Wrong",
					};
			}
		}
		throw error;
	}
};
