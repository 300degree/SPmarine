import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';

export default function HomeLayout() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col flex-1 overflow-hidden">
				<Navbar />
				<main className="max-h-[calc(100vh-100px)] h-full mx-3">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
