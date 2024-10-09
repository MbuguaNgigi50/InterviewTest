import DropdownView from "@/components/dropdownView";
import TableView from "@/components/tableView";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home Page",
};

export default async function HomePage(){
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
