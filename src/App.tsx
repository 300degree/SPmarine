import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

import { siteMap, PageNode } from '@/constant/routes';
import AppProvider from '@/provider/AppProvider';
import LoadingPage from '@/pages/loading';
import BargeManagementDashboard from './pages/home/orders/temp';

/**
 * @brief Depth Render Routes
 */
function DRR(nodes: PageNode[]) {
	return nodes.map((node) => {
		const { path, element, children } = node;

		return <Route key={path} path={path} element={element} children={children && DRR(children)} />;
	});
}

export default function App() {
	return (
		<AppProvider>
			<Suspense fallback={<LoadingPage />}>
				<Routes>
					<Route path="/" element={<Navigate to="/home" replace />} />
					{DRR(siteMap)}
					<Route path="/test" element={<BargeManagementDashboard></BargeManagementDashboard>} />
				</Routes>
			</Suspense>
		</AppProvider>
	);
}
