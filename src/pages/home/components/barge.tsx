import { Card, CardBody, CardHeader, Typography, Input, Button } from '@material-tailwind/react';
import { HiOutlineArrowDownTray, HiMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2';
import { useContext, useState } from 'react';

import BargeContext from '@/contexts/BargesContext';
import ReportConfigModal from '@/components/modal';
import { Barges } from '@/constant/types/barge';
import { ExportCSV } from '@/utils/exportCSV';
import LoadingPage from '@/pages/loading';

function TableHeader({ data, onSearch }: { data: Barges[]; onSearch: (text: string) => void }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4">
			<div>
				<Typography variant="h6" color="blue-gray">
					Barges Overview
				</Typography>
			</div>
			<div className="flex items-center w-full shrink-0 gap-4 md:w-max">
				<ReportConfigModal open={isOpen} onClose={() => setIsOpen(false)} />
				<Button variant="outlined" className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
					<HiOutlinePlus className="w-4 h-4" /> ADD NEW
				</Button>
				<Button
					className="flex items-center gap-2"
					onClick={() => {
						let temp = data.map((val, _idx) => {
							return {
								ID: val.id,
								NAME: val.name,
								WEIGHT: val.weight,
								CAP: val.cap,
								LAT: val.last,
								LNG: val.long,
								'WATER STATUS': val.waterStatus,
								STATION: val.station,
								KM: val.kilometer,
								'SETUP TIME': val.setupTime,
								'READY DATETIME': val.readyDateTime,
							};
						});

						ExportCSV(temp, 'barge_overview');
					}}
				>
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

function TableBody({ data }: { data: Barges[] }) {
	const TABLE_HEAD = [
		'Name',
		'Weight',
		'Capacity',
		'Last',
		'Long',
		'Station',
		'Water Status',
		'Kilometer',
		'Setup Time',
		'Ready DateTime',
	];

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
					{data?.map((val, idx) => {
						const isLast = idx === data.length - 1;
						const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

						return (
							<tr key={val.id}>
								<td className={`classes`}>
									<div>
										<Typography variant="small" color="blue-gray" className="!font-semibold" children={val.name} />
										<Typography variant="small" className="!font-normal text-gray-600" children={val.id} />
									</div>
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.weight} />
								</td>
								<td className={classes}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.cap} />
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.last} />
								</td>
								<td className={classes}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.long} />
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography
										variant="small"
										color={val.station === '' ? 'red' : 'blue-gray'}
										className="font-normal"
										children={val.station === '' ? 'ไม่ระบุ' : val.station}
									/>
								</td>
								<td className={classes}>
									<Typography
										variant="small"
										color={val.waterStatus === 'SEA' ? 'green' : 'cyan'}
										className="font-normal"
										children={val.waterStatus}
									/>
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.kilometer} />
								</td>
								<td className={classes}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.setupTime} />
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography
										variant="small"
										color="blue-gray"
										className="font-normal"
										children={new Date(val.readyDateTime).toLocaleString('th-TH', {
											timeZone: 'Asia/Bangkok',
											year: 'numeric',
											month: 'short',
											day: 'numeric',
											hour: 'numeric',
											minute: 'numeric',
											second: 'numeric',
										})}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</CardBody>
	);
}

export default function BargePage() {
	const { data, loading } = useContext(BargeContext);
	const [searchName, setSearchName] = useState('');
	if (loading || !data) return <LoadingPage />;

	const filterd = data.filter((barge) => {
		return barge.name.toLowerCase().includes(searchName.toLowerCase());
	});

	return (
		<section className="m-10">
			<Card className="h-full w-full">
				<TableHeader data={data} onSearch={setSearchName} />
				<TableBody data={filterd} />
			</Card>
		</section>
	);
}
