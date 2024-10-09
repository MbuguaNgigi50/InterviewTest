import * as z from "zod";

export const LoginFormSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Invalid Email")
		.toLowerCase(),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must have at least 8 characters"),
});

export const RegistrationFormSchema = z
	.object({
		email: z
			.string()
			.min(1, "Email is required")
			.email("Invalid Email")
			.toLowerCase(),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must have at least 8 characters")
			.max(40, "Password cannot be more than 40 characters"),
		confirmPassword: z.string().min(1, "You need to confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "The Passwords do not match",
	});
