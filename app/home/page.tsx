import DropdownView from "@/components/dropdownView";
import TableView from "@/components/tableView";
import { getProducts, getProductsPlans } from "@/lib/products";
import { Metadata } from "next";

import { Plans } from "@prisma/client";
import { Products } from "@prisma/client";

export const metadata: Metadata = {
	title: "Home Page",
};

interface Props {
	planItems: Plans[];
	productItems: Products[];
}

export default async function HomePage({ planItems, productItems }: Props) {
	const products = await getProducts();
	const getList = await getProductsPlans();

	const formatList = planItems.map((item) => ({
		label: item.planName,
		value: item.planId,
	}));
	const getDrop = productItems.map((item) => ({
		label: item.productName,
		value: item.productId,
	}));
	return (
		<>
			<div className='relative h-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<div className='lg:p-8'>
					<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<DropdownView />
							<TableView />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
