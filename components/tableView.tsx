"use client";

import * as React from "react";

import { getProductsPlans } from "@/lib/products";

export default async function TableView() {

	const plans = await getProductsPlans();

	const plansList = plans?.map((item) => ({
		label: item.planName,
		value: item.planId,
	}));

	return (
		<>
			{plansList?.map((productPlan) => {
				<table key={productPlan.value}>{productPlan.label}</table>;
			})}
		</>
	);
}
