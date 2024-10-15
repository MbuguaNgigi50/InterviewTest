"use server";

import * as z from "zod";
import { RegistrationFormSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/user";
import { db } from "@/lib/db";

import { hash } from "bcryptjs";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";

export const register = async (
	values: z.infer<typeof RegistrationFormSchema>
) => {
	const validatedFields = RegistrationFormSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Invalid Fields",
		};
	}

	const { email, password } = validatedFields.data;

	try {
		const emailExists = await getUserByEmail(email);

		if (emailExists) {
			return {
				error: "Email Already Exists",
			};
        }
        
		const hashedPassword = await hash(password, 12);

		const user = await db.user.create({
			data: {
				email: email,
				password: hashedPassword,
			},
        });
        
		const session = await lucia.createSession(user.id, {});
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
			error: "Something Went Wrong"
		};
	}
};
