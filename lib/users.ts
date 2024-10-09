import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.userLogin.findUnique({
			where: {
				email,
			},
		});
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await db.userLogin.findUnique({
			where: {
				id,
			},
		});
		return user;
	} catch (error) {
		return null;
	}
};
