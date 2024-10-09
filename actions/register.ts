"use server";

import * as z from "zod";

import {hash} from "bcryptjs"

import { RegistrationFormSchema } from "@/schemas";

import { getUserByEmail } from "@/lib/users";

import { db } from "@/lib/db";

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

		await db.userLogin.create({
			data: {
				email: email,
				password: hashedPassword,
			},
		});

		return {
			success: "Registration Successful",
		};
	} catch (error: any) {
		return {
			error: "Something Went Wrong",
		};
	}
};
