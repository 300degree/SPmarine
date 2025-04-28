import { Card, CardBody, CardHeader, Typography, Input, Button } from '@material-tailwind/react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';

import { ExportCSV } from '@/pages/barge/utils/export';
import TugboatContext from '@/contexts/TugboatContext';
import { Tugboats } from '@/constant/types/tugboat';
import LoadingPage from '@/pages/loading';
import Layout from '@/components/homeLayout';

function TableHeader({ data }: { data: Tugboats[] }) {
	return (
		<CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4">
			<div>
				<Typography variant="h6" color="blue-gray">
					Barges Overview
				</Typography>
			</div>
			<div className="flex items-center w-full shrink-0 gap-4 md:w-max">
				<Button className="flex items-center gap-2" onClick={() => ExportCSV<Tugboats>(data, 'tugboat_overview')}>
					<ArrowDownTrayIcon strokeWidth={3} className="w-3 h-3" />
					EXPORT
				</Button>
				<div className="w-full md:w-72">
					<Input size="lg" label="Search" icon={<MagnifyingGlassIcon />} className="h-5 w-5" crossOrigin={undefined} />
				</div>
			</div>
		</CardHeader>
	);
}

function TableBody({ data }: { data: Tugboats[] }) {
	const TABLE_HEAD = [
		'Name',
		'Max Capacity',
		'Max Barge',
		'Max FuelCon',
		'Type',
		'Min Speed',
		'Max Speed',
		'RPM',
		'HP',
		'Last',
		'Long',
		'Status',
		'Kilometer',
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
					{data?.map((val: Tugboats, idx: number) => {
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
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.maxCap} />
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.maxBarge} />
								</td>
								<td className={classes}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.maxFuelCon} />
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography
										variant="small"
										color={val.type === 'SEA' ? 'green' : 'cyan'}
										className="font-normal"
										children={val.type}
									/>
								</td>
								<td className={classes}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.minSpeed} />
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.maxSpeed} />
								</td>
								<td className={classes}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.rpm} />
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.hp} />
								</td>
								<td className={classes}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.last} />
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.long} />
								</td>
								<td className={classes}>
									<Typography
										variant="small"
										color={val.status === 'SEA' ? 'green' : 'cyan'}
										className="font-normal"
										children={val.status}
									/>
								</td>
								<td className={`${classes} bg-blue-gray-50/50`}>
									<Typography variant="small" color="blue-gray" className="font-normal" children={val.kilometer} />
								</td>
								<td className={classes}>
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

export default function TugboatPage({}: {}) {
	const { data, loading } = useContext(TugboatContext);
	if (loading || !data) return <LoadingPage />;

	return (
		// <Layout>
		// 	</Layout>
		<section className="m-10">
			<Card className="h-full w-full">
				<TableHeader data={data} />
				<TableBody data={data} />
			</Card>
		</section>
	);
}
