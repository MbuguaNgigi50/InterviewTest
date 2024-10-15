"use client";

import { planAdd } from "@/actions/products";
import { Products } from "@prisma/client";
import { ChangeEvent, useState } from "react";

interface ProductProps {
	items: Products[];
}

export function DropDownView({ items = [] }: ProductProps) {
	const formatList = items.map((item) => ({
		name: item.productName,
		value: item.id,
	}));

	const [value, setValue] = useState("");

	function handleSubmit(event: ChangeEvent<HTMLSelectElement>){
		setValue(event.target.value);
		// const prodValue = event.target.value
		// console.log("This is an updated value: ", prodValue)
		planAdd(event.target.value);
	};

	return (
		<>
			<div className='d-flex justify-content-center mt-5'>
				<h1>The currently selected item is {value}</h1>
				<select
					name='Dropdown Menu'
					onChange={handleSubmit}>
					<option></option>
					{formatList.map((products) => (
						<option key={products.value} value={products.name}>
							{products.name}
						</option>
					))}
				</select>
			</div>
		</>
	);
}
