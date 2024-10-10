import { getPlan } from "@/lib/data";
import { Plans } from "@prisma/client";

interface PlansProps {
	items: Plans[];
}

export default async function TableView({ items = [] }: PlansProps) {

	const formatList = items.map((item) => ({
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
					{formatList.map((item) => {
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
