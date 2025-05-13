import { Card, CardBody, CardHeader, Typography, Input, Button } from '@material-tailwind/react';
import { HiOutlineArrowDownTray, HiMagnifyingGlass } from 'react-icons/hi2';
import { HiOutlinePlus } from 'react-icons/hi';
import { useContext, useState } from 'react';

import OrderContext from '@/contexts/OrderContext';
import { Orders } from '@/constant/types/order';
import { ExportCSV } from '@/utils/exportCSV';
import { formatDate } from '@/utils/date';
import LoadingPage from '@/pages/loading';
import ReportConfigModal from '@/components/modal';

function TableHeader({ data, onSearch }: { data: Orders[]; onSearch: (text: string) => void }) {
	const [isOpen, setIsOpen] = useState(false);

	const exportData = data.map(
		({
			type,
			from,
			dest,
			product,
			demand,
			startDateTime,
			DueDateTime,
			loadingRate,
			craneRate1,
			craneRate2,
			craneRate3,
			craneRate4,
			craneRate5,
			craneRate6,
			craneRate7,
			timeReadyCR1,
			timeReadyCR2,
			timeReadyCR3,
			timeReadyCR4,
			timeReadyCR5,
			timeReadyCR6,
			timeReadyCR7,
		}) => ({
			Type: type,
			From: from,
			Dest: dest,
			Product: product,
			Demand: demand,
			'Start Date Time': startDateTime,
			'Due Date Time': DueDateTime,
			'Loading Rate': loadingRate,
			CraneRate1: craneRate1,
			CraneRate2: craneRate2,
			CraneRate3: craneRate3,
			CraneRate4: craneRate4,
			CraneRate5: craneRate5,
			CraneRate6: craneRate6,
			CraneRate7: craneRate7,
			TimeReadyCR1: timeReadyCR1,
			TimeReadyCR2: timeReadyCR2,
			TimeReadyCR3: timeReadyCR3,
			TimeReadyCR4: timeReadyCR4,
			TimeReadyCR5: timeReadyCR5,
			TimeReadyCR6: timeReadyCR6,
			TimeReadyCR7: timeReadyCR7,
		}),
	);

	return (
		<>
			<CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4">
				<Typography variant="h6" color="blue-gray">
					Barges Overview
				</Typography>
				<div className="flex items-center w-full shrink-0 gap-4 md:w-max">
					<Button variant="outlined" className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
						<HiOutlinePlus className="w-4 h-4" /> ADD NEW
					</Button>
					<Button className="flex items-center gap-2" onClick={() => ExportCSV(exportData, 'orders_overview')}>
						<HiOutlineArrowDownTray className="w-4 h-4" /> EXPORT
					</Button>
					<div className="w-full md:w-72">
						<Input
							size="lg"
							label="Search"
							icon={<HiMagnifyingGlass />}
							crossOrigin={undefined}
							onChange={(e) => onSearch(e.target.value)}
						/>
					</div>
				</div>
			</CardHeader>
			<ReportConfigModal open={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
}

function TableBody({ data }: { data: Orders[] }) {
	const TABLE_HEAD = [
		'Id',
		'Type',
		'From',
		'Dest',
		'Product',
		'Demand',
		'Start Date Time',
		'Due Date Time',
		'Loading Rate',

		'CraneRate1',
		'CraneRate2',
		'CraneRate3',
		'CraneRate4',
		'CraneRate5',
		'CraneRate6',
		'CraneRate7',

		'TimeReadyCR1',
		'TimeReadyCR2',
		'TimeReadyCR3',
		'TimeReadyCR4',
		'TimeReadyCR5',
		'TimeReadyCR6',
		'TimeReadyCR7',
	];

	return (
		<div className="overflow-auto">
			<div className="overflow-x-auto">
				<CardBody className="h-full w-full max-h-[700px]">
					<table className="min-w-max table-auto text-left">
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
							{data?.map((order, idx) => {
								const rowData = [
									order.id,
									order.type,
									order.from,
									order.dest,
									order.product || 'ไม่ระบุ',
									order.demand,
									formatDate(order.startDateTime),
									formatDate(order.DueDateTime),
									order.loadingRate,
									order.craneRate1,
									order.craneRate2,
									order.craneRate3,
									order.craneRate4,
									order.craneRate5,
									order.craneRate6,
									order.craneRate7,
									order.timeReadyCR1,
									order.timeReadyCR2,
									order.timeReadyCR3,
									order.timeReadyCR4,
									order.timeReadyCR5,
									order.timeReadyCR6,
									order.timeReadyCR7,
								];

								return (
									<tr key={order.id}>
										{rowData.map((cell, cIdx) => (
											<td
												key={cIdx}
												className={`p-4 ${cIdx % 2 && 'bg-blue-gray-50/50'}  ${
													idx < data.length - 1 ? 'border-b border-blue-gray-50' : ''
												}`}
											>
												<Typography
													variant="small"
													color="blue-gray"
													className={cIdx === 0 ? '!font-semibold' : 'font-normal'}
													children={cell}
												/>
											</td>
										))}
									</tr>
								);
							})}
						</tbody>
					</table>
				</CardBody>
			</div>
		</div>
	);
}

export default function OrderPage({}: {}) {
	const { data, loading } = useContext(OrderContext);
	const [searchText, setSearchText] = useState('');
	if (loading || !data) return <LoadingPage />;

	const filterd = data.filter((order) => {
		return order.id.toLowerCase().includes(searchText.toLowerCase());
	});

	return (
		<section className="m-10">
			<Card className="h-full w-full">
				{/* added flex-col to fixd table no response scrollbar*/}
				<TableHeader data={data} onSearch={setSearchText} />
				<TableBody data={filterd} />
			</Card>
		</section>
	);
}
