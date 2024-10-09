"use client";

import * as React from "react";

import { getProducts, pushProducts } from "@/lib/products";

export default async function DropdownView() {

    const products = await getProducts();

    const productList = products?.map((item: any) => ({
        label: item.productName,
        value: item.productId
    }))

    return (
			<>
				{productList?.map((product: any) => {
					<select
						key={product.value}
						onSelect={() => {
							pushProducts(product.value, product.label);
						}}
					>
						{product.label}
					</select>;
				})}
			</>
		);
}
