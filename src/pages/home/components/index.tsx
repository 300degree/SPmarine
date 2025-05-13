import { HiSquares2X2, HiUsers, HiChevronRight, HiOutlineCog8Tooth } from 'react-icons/hi2';
import { Typography, Card, CardBody, CardFooter } from '@material-tailwind/react';
import { GiCargoShip, GiFishingBoat } from 'react-icons/gi';
import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';

import CustomerContext from '@/contexts/CustomerContext';
import StationContext from '@/contexts/StationContext';
import TugboatContext from '@/contexts/TugboatContext';
import CarrierContext from '@/contexts/CarrierContext';
import BargeContext from '@/contexts/BargesContext';
import LoadingPage from '@/pages/loading';

type dataProps = { label: string; value: number | string; icon: ReactNode; iconColor: string };

function KPICard({ data }: { data: dataProps }) {
	return (
		<Card className="w-full shadow-md rounded-xl transition-transform duration-200 hover:scale-[1.02]">
			<CardBody className="p-4">
				<div className="flex justify-between items-start mb-2">
					<div>
						<Typography variant="h5" className="text-gray-900">
							{data.label}
						</Typography>
						<Typography variant="h5" className="font-bold text-blue-gray-900">
							{data.value}
						</Typography>
					</div>
					<div className={`text-5xl ml-auto p-2 bg-gray-100 rounded-md ${data.iconColor}`}>{data.icon}</div>
				</div>
			</CardBody>

			<Link to={''}>
				<CardFooter className="border-t px-4 py-2 flex items-center justify-between">
					<Typography className="text-sm font-medium text-gray-700">Get Report</Typography>
					<HiChevronRight className="h-4 w-4 text-gray-500" />
				</CardFooter>
			</Link>
		</Card>
	);
}

export default function ComponentPage() {
	const { data: customerData } = useContext(CustomerContext);
	const { data: tugbaotData } = useContext(TugboatContext);
	const { data: carrierData } = useContext(CarrierContext);
	const { data: stationData } = useContext(StationContext);
	const { data: bargeData } = useContext(BargeContext);

	if (!bargeData || !tugbaotData || !carrierData || !customerData || !stationData) return <LoadingPage />;

	const head: dataProps[] = [
		{ label: 'Tugboat', value: tugbaotData.length || 0, icon: <GiCargoShip />, iconColor: 'text-[#3F51B5]' },
		{ label: 'Barge', value: bargeData?.length || 0, icon: <GiFishingBoat />, iconColor: 'text-[#009688]' },
		{ label: 'Station', value: stationData.length || 0, icon: <HiOutlineCog8Tooth />, iconColor: 'text-[#607D8B]' },
		{ label: 'Customer', value: customerData.length || 0, icon: <HiUsers />, iconColor: 'text-[#FF5722]' },
		{ label: 'Carrier', value: carrierData.length || 0, icon: <HiSquares2X2 />, iconColor: 'text-[#9C27B0]' },
	];

	return (
		<section className="max-w-7xl mx-auto px-4 py-10">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{head.map((val, idx) => (
					<KPICard key={idx} data={val} />
				))}
			</div>
		</section>
	);
}
