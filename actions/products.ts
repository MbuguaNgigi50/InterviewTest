'use server'

import * as z from "zod";
import { ProductsSchema } from "@/schemas";
import { db } from "@/lib/db";

export async function productAdd(values: z.infer<typeof ProductsSchema>){
	const validatedFields = ProductsSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Something Went Wrong",
		};
	}

	const { productName } = validatedFields.data;

	try {
		await db.products.create({
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

export async function planAdd(value: string) {
	try {
		const product = await db.plans.create({
			data: {
				planName: value,
			},
		});
		return {
			success: true
		}
	} catch (error: any) {
		return {
			error: "Something Went Wrong"
		}
	}
}

export async function getPlan(){
	try {
		const plans = await db.plans.findMany();
		return plans;
	} catch (error) {
		return null;
	}
};