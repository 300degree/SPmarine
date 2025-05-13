import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';

export default function HomeLayout() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col flex-1 overflow-hidden">
				<Navbar />
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
