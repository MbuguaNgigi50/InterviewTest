import { db } from "./db";

export const planAdd = async (productName: string) => {

	try {
		const planProduct = await db.plans.create({
			data: {
				planName: productName,
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

export const getProducts = async () => {
	try {
		const product = await db.products.findMany();
		return product
	} catch (error) {
		return null
	}
};

export const getProductsById = async (id: string) => {
	try {
		const product = await db.products.findUnique({
			where: {
				id
			}
		});
		return product
	} catch (error) {
		return null
	}
};

export const getPlan = async () => {
	try {
		const plans = await db.plans.findMany();
		return plans
	} catch (error) {
		return null
	}
};
