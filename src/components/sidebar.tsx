import { Typography, List, ListItemPrefix } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import { GiCargoShip, GiFishingBoat } from 'react-icons/gi';
import { BsBoxSeam } from 'react-icons/bs';
import { LuUsers } from 'react-icons/lu';
import { ReactNode } from 'react';

import logo from '@/assets/intermarine_logo.png';

interface SidebarItem {
	label: string;
	icon: ReactNode;
	to: string;
	active?: boolean;
}

const sidebarItems: SidebarItem[] = [
	{ label: 'Dashboard', icon: <LuUsers />, to: '/home/dashboard' },
	{ label: 'Barges', icon: <GiCargoShip />, to: '/home/barges' },
	{ label: 'Tugboats', icon: <GiFishingBoat />, to: '/home/tugboats' },
	{ label: 'Orders', icon: <BsBoxSeam />, to: '/home/orders' },
	{ label: 'Customers', icon: <LuUsers />, to: '/home/customers' },
];

export default function Sidebar({}: {}) {
	const location = useLocation();

	return (
		<aside className="h-screen w-64 bg-gray-900 flex flex-col justify-between">
			<div>
				<div className="p-6" children={<img src={logo} loading="lazy" alt="" />} />

				<List>
					{sidebarItems.map((val, idx) => {
						const isActive = location.pathname.startsWith(val.to);

						return (
							<Link key={idx} to={val.to}>
								<div
									className={`relative overflow-hidden flex w-full p-3 rounded-lg
              								hover:bg-gray-800 hover:text-yellow-300
															${isActive ? 'bg-gray-800 text-yellow-300' : 'text-gray-500'}`}
									onClick={(e) => {
										const ripple = document.createElement('span');
										const rect = e.currentTarget.getBoundingClientRect();
										const size = Math.max(rect.width, rect.height);
										const x = e.clientX - rect.left - size / 2;
										const y = e.clientY - rect.top - size / 2;
										ripple.style.position = 'absolute';
										ripple.style.background = 'rgba(255, 255, 255, 0.3)';
										ripple.style.borderRadius = '50%';
										ripple.style.pointerEvents = 'none';
										ripple.style.width = ripple.style.height = `${size}px`;
										ripple.style.left = `${x}px`;
										ripple.style.top = `${y}px`;
										ripple.style.transform = 'scale(0)';
										ripple.style.opacity = '1';
										ripple.style.animation = 'ripple-animation 600ms ease-out';
										e.currentTarget.appendChild(ripple);
										ripple.addEventListener('animationend', () => {
											ripple.remove();
										});
									}}
								>
									<ListItemPrefix className="text-xl" children={val.icon} />
									<Typography className="text-small" children={val.label} />
								</div>
							</Link>
						);
					})}
				</List>
			</div>

			{/* <div className="p-6 border-t border-gray-700 flex items-center justify-between">
				<div>
					<div className="text-sm font-medium">Ann Smith</div>
					<div className="text-xs text-gray-400">Administrator</div>
				</div>
				<button className="text-gray-400 hover:text-white">Logout</button>
			</div> */}
		</aside>
	);
}
