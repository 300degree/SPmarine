import { useContext } from 'react';
import Papa from 'papaparse';

import BargeContext from '@/contexts/BargesContext';
import LoadingPage from '@/pages/loading';
import Card from '@/components/card';

export default function DashboardPage({}: {}) {
	const { data, loading } = useContext(BargeContext);

	if (loading) return <LoadingPage />;

	return (
		<div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
			<Card labal={''} value={0} icon={<></>} footer="" />
			<Card labal={''} value={0} icon={<></>} footer="" />
			<Card labal={''} value={0} icon={<></>} footer="" />
			<Card labal={''} value={0} icon={<></>} footer="" />
		</div>
	);
}
