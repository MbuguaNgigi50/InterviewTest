import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { LoginFormSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/users";

export default {
	providers: [
		Credentials({
			name: "credentials",
			async authorize(credentials) {
				const validatedFields = LoginFormSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					if (!email || !password) {
						throw new Error("Invalid Credentials");
					}

					const user = await getUserByEmail(email);

					if (!user) {
						throw new Error("User does not exist");
					}
					const isPasswordValid = await compare(password, user.password);

					if (!isPasswordValid) {
						throw new Error("Invalid Credentials");
					}
					return user;
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
