import {
	Card,
	CardBody,
	CardHeader,
	Typography,
	Input,
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Textarea,
} from '@material-tailwind/react';
import { HiOutlineArrowDownTray, HiMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2';
import { useContext, useState } from 'react';

import CustomerContext from '@/contexts/CustomerContext';
import { Customers } from '@/constant/types/customer';
import { ExportCSV } from '@/utils/exportCSV';
import LoadingPage from '@/pages/loading';

function CustomerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
	return (
		<Dialog open={open} handler={onClose} size="lg">
			<DialogHeader>
				<Typography variant="h5" className="text-blue-700">
					Customer Information
				</Typography>
			</DialogHeader>

			<DialogBody className="grid grid-cols-1 gap-6 text-sm">
				{/* Row 1: Customer ID & Name */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Typography variant="small" color="blue-gray">
							Customer ID
						</Typography>
						<Input label="e.g., cus01" crossOrigin={undefined} />
					</div>
					<div>
						<Typography variant="small" color="blue-gray">
							Customer Name
						</Typography>
						<Input label="e.g., Intermarine Co." crossOrigin={undefined} />
					</div>
				</div>

				{/* Row 2: Station ID & Name */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Typography variant="small" color="blue-gray">
							Station ID
						</Typography>
						<Input label="e.g., s1" crossOrigin={undefined} />
					</div>
					<div>
						<Typography variant="small" color="blue-gray">
							Station Name
						</Typography>
						<Input label="e.g., Koh Si Chang" crossOrigin={undefined} />
					</div>
				</div>

				{/* Address */}
				<div>
					<Typography variant="small" color="blue-gray">
						Address
					</Typography>
					<Textarea label="Customer address" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Typography variant="small" color="blue-gray">
							Phone Number
						</Typography>
						<Input label="e.g., 0123456789" crossOrigin={undefined} />
					</div>
				</div>
			</DialogBody>

			<DialogFooter className="flex justify-end gap-2">
				<Button variant="text" color="gray" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="filled" color="blue" onClick={() => console.log('Customer Saved!')}>
					Save
				</Button>
			</DialogFooter>
		</Dialog>
	);
}

function TableHeader({ data, onSearch }: { data: Customers[]; onSearch: (text: string) => void }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4">
			<div>
				<Typography variant="h6" color="blue-gray">
					Customer Overview
				</Typography>
			</div>
			<div className="flex items-center w-full shrink-0 gap-4 md:w-max">
				<CustomerModal open={isOpen} onClose={() => setIsOpen(false)} />
				<Button variant="outlined" className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
					<HiOutlinePlus className="w-4 h-4" /> ADD NEW
				</Button>
				<Button className="flex items-center gap-2" onClick={() => ExportCSV<Customers>(data, 'customer_overview')}>
					<HiOutlineArrowDownTray strokeWidth={3} className="w-3 h-3" />
					EXPORT
				</Button>
				<div className="w-full md:w-72">
					<Input
						size="lg"
						label="Search"
						icon={<HiMagnifyingGlass />}
						className="h-5 w-5"
						crossOrigin={undefined}
						onChange={(e) => onSearch(e.target.value)}
					/>
				</div>
			</div>
		</CardHeader>
	);
}

function TableBody({
	data,
}: {
	data: { customerId: string; customerName: string; StationId: string; StationName: string }[];
}) {
	const TABLE_HEAD = ['Name', 'Station'];

	return (
		<CardBody className="h-full w-full max-h-[700px] overflow-scroll">
			<table className="w-full table-auto text-left">
				<thead>
					<tr>
						{TABLE_HEAD.map((head) => (
							<th key={head} className="border-blue-gray-100 bg-blue-gray-50 p-4">
								<Typography
									variant="small"
									color="blue-gray"
									className="font-normal leading-none opacity-70"
									children={head}
								/>
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data?.map((val, idx: number) => {
						const isLast = idx === data.length - 1;
						const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

						return (
							<tr key={val.customerId}>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<div>
										<Typography
											variant="small"
											color="blue-gray"
											className="!font-semibold"
											children={val.customerName}
										/>
										<Typography variant="small" className="!font-normal text-gray-600" children={val.customerId} />
									</div>
								</td>
								<td className={classes}>
									<Typography variant="small" color="blue-gray" className="!font-semibold" children={val.StationName} />
									<Typography variant="small" className="!font-normal text-gray-600" children={val.StationId} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</CardBody>
	);
}

export default function CustomerPage({}: {}) {
	const { data, loading } = useContext(CustomerContext);
	const [searchText, setSearchText] = useState('');
	if (loading || !data) return <LoadingPage />;

	const tempData = [
		{ customerId: 'cus1', customerName: 'customer1', StationId: 's10', StationName: 'Wat Kai Tia Pier' },
		{ customerId: 'cus2', customerName: 'customer2', StationId: 's11', StationName: 'Sam Khok Pier' },
		{ customerId: 'cus3', customerName: 'customer3', StationId: 's12', StationName: 'Wat Chang Yai' },
	];

	const filterd = tempData.filter((customer) => {
		return customer.customerName.toLowerCase().includes(searchText.toLowerCase());
	});

	return (
		<section className="m-10">
			<Card className="h-full w-full">
				<TableHeader data={data} onSearch={setSearchText} />
				<TableBody data={filterd} />
			</Card>
		</section>
	);
}
