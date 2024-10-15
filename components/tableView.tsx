'use client'

import { Plans } from "@prisma/client";

interface PlansProps {
	items: Plans[];
}

export default function TableView({ items = [] }: PlansProps) {
	
	const formattedList = items.map((item) => ({
		label: item.planName,
		value: item.id,
	}));

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>PRODUCT NAME</th>
					</tr>
				</thead>
				<tbody>
					{formattedList.map((item) => {
						return (
							<tr key={item.value}>
								<td>{item.label}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
