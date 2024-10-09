import { db } from "@/lib/db";

export const getProducts = async () => {
	try {
		const products = await db.products.findMany({
			where: {
				productId
			},
		});
		return products;
	} catch (error) {
		return null;
	}
};
