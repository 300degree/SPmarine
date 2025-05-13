import { Card, Typography, CardBody } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

function ComponentsCard({ data }: { data: { label: string; to: string; icon: ReactNode } }) {
	return (
		<Link to={data.to}>
			<Card className="mt-6 w-full transition-transform duration-300 transform hover:scale-105">
				<CardBody className="flex items-center p-6 space-x-4">
					<div className="flex-shrink-0 text-4xl text-gray-500">{data.icon}</div>
					<div>
						<Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
							{data.label}
						</Typography>
						<Typography className="text-gray-600 text-sm">
							The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you
							can enjoy the main night life in Barcelona.
						</Typography>
					</div>
				</CardBody>
			</Card>
		</Link>
	);
}

export default function HomePage() {
	const arraypage: { label: string; to: string; icon: ReactNode }[] = [
		{ label: 'Components', to: '/home/components', icon: <i className="fas fa-laptop"></i> },
		{ label: 'Orders', to: '/home/fashion', icon: <i className="fas fa-tshirt"></i> },
		{ label: 'Results', to: '/home/books-media', icon: <i className="fas fa-book"></i> },
	];

	return (
		<section className="w-full max-w-[900px] mx-auto px-4 py-10">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{arraypage.map((val, idx) => (
					<ComponentsCard key={idx} data={val} />
				))}
			</div>
		</section>
	);
}
