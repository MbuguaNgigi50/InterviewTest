import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

import { getUserById } from "@/lib/users";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { parsedEnv } from "@/env";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: PrismaAdapter(db),
	debug: process.env.NODE_ENV !== "production",
	callbacks: {
		async signIn({ user, account}) {
			const existingUser = await getUserById(user.id as any)

			if (!existingUser) {
				return false;
			}
			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			console.log("Session Callback Token", token);
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);

			if (!existingUser) {
				return token;
			}

			console.log("JWT Callback Token", token);
			return token;
		},
	},
	secret: parsedEnv.AUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	...authConfig,
});
