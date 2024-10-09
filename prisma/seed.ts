import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Products = ["Tomatoes", "Peas", "Lettuce", "Cabbage", "Spinach"]

async function main() {
    const user = await prisma.products.create({
			data: {
				productName: Products,
			},
		});
	console.log({ user });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});