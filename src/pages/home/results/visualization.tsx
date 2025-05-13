import { useContext, useMemo } from 'react';
// import { Chart } from 'react-google-charts';

import OrderContext from '@/contexts/OrderContext';
import LoadingPage from '@/pages/loading';

const columns = [
	{ type: 'string', label: 'Task ID' },
	{ type: 'string', label: 'Task Name' },
	{ type: 'string', label: 'Resource' },
	{ type: 'date', label: 'Start Date' },
	{ type: 'date', label: 'End Date' },
	{ type: 'number', label: 'Duration' },
	{ type: 'number', label: 'Percent Complete' },
	{ type: 'string', label: 'Dependencies' },
];

const options = {
	height: 400,
	gantt: {
		trackHeight: 30,
	},
};

export default function VisualizationPage() {
	const { data: order, loading } = useContext(OrderContext);

	if (!order || loading) return <LoadingPage />;

	const rows = useMemo(() => {
		return order.map((i) => [
			i.id,
			`${i.product} (${i.type})`,
			i.from + ' → ' + i.dest,
			new Date(i.startDateTime),
			new Date(i.DueDateTime),
			null,
			0,
			null,
		]);
	}, [order]);

	const data = [columns, ...rows];

	// return <Chart chartType="Gantt" width="100%" height="50%" data={data} options={options} />;
	return <></>;
}
