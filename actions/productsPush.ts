export const pushProducts = async () {
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
}