'use server'

import * as z from "zod";
import { ProductsSchema } from "@/schemas";
import { db } from "@/lib/db";

export const productAdd = async (values: z.infer<typeof ProductsSchema>) => {
	const validatedFields = ProductsSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Something Went Wrong",
		};
	}

	const { productName } = validatedFields.data;

	try {
		const product = await db.products.create({
			data: {
				productName: productName,
			},
		});

		return {
			success: true,
		};
	} catch (error: any) {
		return {
			error: "Something Went Wrong",
		};
	}
};