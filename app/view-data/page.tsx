import { DropdownView } from "@/components/dropdownView";
import { TableView } from "@/components/tableView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home Page",
};

export default function Views() {
	return (
		<>
			<div>
				<div className='flex flex-col space-y-2 text-center'>
					<DropdownView />
					<TableView />
				</div>
			</div>
		</>
	);
}
