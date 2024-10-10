import {AddProducts} from "@/components/addProducts";
import {DropDownView} from "@/components/dropdownView";
import TableView from "@/components/tableView";
import { db } from "@/lib/db";

export default async function DashboardPage() {
	const productsList = await db.products.findMany()

	const plansList = await db.plans.findMany()

	return (
		<>
			<div>
				<AddProducts />
			</div>

			<div>
				<DropDownView items={productsList} />
			</div>

			<div>
				<TableView items={plansList} />
			</div>
		</>
	);
}
