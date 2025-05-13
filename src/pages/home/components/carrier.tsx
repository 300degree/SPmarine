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
} from '@material-tailwind/react';
import { HiOutlineArrowDownTray, HiMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2';
import { useContext, useState } from 'react';

import CarrierContext from '@/contexts/CarrierContext';
import { Carriers } from '@/constant/types/carrier';
import { ExportCSV } from '@/utils/exportCSV';
import LoadingPage from '@/pages/loading';

function CarrierInfoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
	return (
		<Dialog open={open} handler={onClose} size="xl">
			<DialogHeader>
				<Typography variant="h5" className="text-blue-700">
					Carrier Information
				</Typography>
			</DialogHeader>

			<DialogBody className="grid grid-cols-1 gap-4 text-sm">
				{/* Row 1: ID, Order ID, Carrier Name */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<Typography variant="small" color="blue-gray">
							ID
						</Typography>
						<Input label="e.g., cr1, cr2" crossOrigin={undefined} />
					</div>
					<div>
						<Typography variant="small" color="blue-gray">
							Order ID
						</Typography>
						<Input label="Related order ID" crossOrigin={undefined} />
					</div>
					<div>
						<Typography variant="small" color="blue-gray">
							Carrier Name
						</Typography>
						<Input label="e.g., carrier1, carrier2" crossOrigin={undefined} />
					</div>
				</div>

				{/* Location */}
				{/* <div>
					<Typography variant="h6" color="blue-gray">
						Location
					</Typography>
					<div className="bg-blue-gray-50 h-60 w-full rounded-md flex items-center justify-center text-gray-500 text-sm">
						Map will be displayed here
					</div>
				</div> */}

				{/* Row 2: Latitude, Longitude */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Typography variant="small" color="blue-gray">
							Latitude
						</Typography>
						<Input label="e.g., 13.7563" crossOrigin={undefined} />
					</div>
					<div>
						<Typography variant="small" color="blue-gray">
							Longitude
						</Typography>
						<Input label="e.g., 100.5018" crossOrigin={undefined} />
					</div>
				</div>
			</DialogBody>

			<DialogFooter className="flex justify-end gap-2">
				<Button color="orange" variant="filled" onClick={() => console.log('Reset')}>
					Reset
				</Button>
				<Button color="green" variant="filled" onClick={() => console.log('Save Carrier')}>
					Save Carrier
				</Button>
			</DialogFooter>
		</Dialog>
	);
}

function TableHeader({ data, onSearch }: { data: Carriers[]; onSearch: (text: string) => void }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4">
			<div>
				<Typography variant="h6" color="blue-gray">
					Carriers Overview
				</Typography>
			</div>
			<div className="flex items-center w-full shrink-0 gap-4 md:w-max">
				<CarrierInfoModal open={isOpen} onClose={() => setIsOpen(false)} />
				<Button variant="outlined" className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
					<HiOutlinePlus className="w-4 h-4" /> ADD NEW
				</Button>
				<Button className="flex items-center gap-2" onClick={() => ExportCSV<Carriers>(data, 'carrier_overview')}>
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

function TableBody({ data }: { data: Carriers[] }) {
	const TABLE_HEAD = ['Name', 'Last', 'Long'];

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
					{data?.map((val: Carriers, idx: number) => {
						const isLast = idx === data.length - 1;
						const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

						return (
							<tr key={val.id}>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<div>
										<Typography variant="small" color="blue-gray" className="!font-semibold" children={val.name} />
										<Typography variant="small" className="!font-normal text-gray-600" children={val.id} />
									</div>
								</td>
								<td className={classes}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.last} />
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.long} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</CardBody>
	);
}

export default function CarrierPage() {
	const { data, loading } = useContext(CarrierContext);
	const [searchText, setSearchText] = useState('');
	if (loading || !data) return <LoadingPage />;

	const filterd = data.filter((carrier) => {
		return carrier.name.toLowerCase().includes(searchText.toLowerCase());
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
