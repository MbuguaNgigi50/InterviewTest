'use client'

import { planAdd } from "@/lib/data";
import { Products } from "@prisma/client";

interface ProductProps {
	items: Products[]
}

export function DropDownView({
	items = []
}: ProductProps) {

	const formatList = items.map((item) => ({
		label: item.productName,
		value: item.id
	}))

	return (
		<>
			<div className ="d-flex justify-content-center mt-5">
				<select
					onSelect={handleSubmit}
				>
					{formatList.map((products) => (
						<option key={products.value}>
							{products.label}
						</option>
					))
					}
				</select>
				</div>
		</>
	);
}
