"use client";

import * as React from "react";

import { getProductsPlans } from "@/lib/products";

export async function TableView() {

	const plans = await getProductsPlans();

	const plansList = plans?.map((item: any) => ({
		label: item.planName,
		value: item.planId,
	}));

	return (
		<>
			{plansList?.map((productPlan: any) => {
				<table key={productPlan.value}>{productPlan.label}</table>;
			})}
		</>
	);
}
