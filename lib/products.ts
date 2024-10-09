import { db } from "@/lib/db"

export const getProducts = async () => {
    try {
        const product = await db.products.findMany()
        return product
    } catch (error) {
        return null
    }
}

export const getProductsPlans = async () => {
	try {
		const productPlan = await db.plans.findMany();
		return productPlan;
	} catch (error) {
		return null;
	}
};

export const pushProducts = async (id: string, name: string) => {
    try {
        const newProduct = await db.plans.create({
            data: {
                planId: id,
                planName: name
            }
        })
        return newProduct
    } catch (error) {
        
    }
}