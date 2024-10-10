"use server";

import * as z from "zod";

import { LoginFormSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/user";
import { compare } from "bcryptjs";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
	const validatedFields = LoginFormSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Something Went Wrong",
		};
	}

	const { email, password } = validatedFields.data;

	try {
		//Checking to see if the user's email exists or if the passed email is tied to an account
		const existingUser = await getUserByEmail(email);

		//Checking to see if the user trying to login has an active account after first registration
		if (!existingUser || !existingUser.email || !existingUser.password) {
			return {
				error: "Email Does Not Exist",
			};
		}
        
		const isPasswordValid = await compare(password, existingUser.password);

		if (!isPasswordValid) {
			throw new Error("Invalid Credentials");
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return {
			success: true
		};
	} catch (error: any) {
		return {
			error: "Something Went Wrong",
		};
	}
};
