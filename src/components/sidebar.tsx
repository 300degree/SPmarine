import { motion, AnimatePresence, isNodeOrChild } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { List } from '@material-tailwind/react';
import { useState } from 'react';

import type { SidebarItem as IsidebarItem } from '@/constant/interfaces';
import SidebarItem, { sidebarItems } from '@/components/sidebarItems';
import logo from '@/assets/intermarine_logo.png';
import { PageNode, siteMap } from '@/constant/routes';

export default function Sidebar() {
	const location = useLocation();
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const toggleDropdown = (label: string) => {
		setOpenDropdown((prev) => (prev === label ? null : label));
	};

	const DRR = (nodes: PageNode[]) => {
		return nodes.map((node) => {
			const isDropdown = !!node.children;
			const isActive = location.pathname.startsWith(node.path);
			const isOpen = openDropdown === node.name;

			return (
				<SidebarItem
					key={node.name}
					item={{
						label: node.name,
						to: node.path,
						icon: node.icon,
					}}
					isActive={isActive}
					isOpen={isOpen}
					toggleDropdown={toggleDropdown}
				>
					<AnimatePresence initial={false}>
						{isDropdown && isOpen && (
							<motion.div
								initial={{ opacity: 0, height: 0, scale: 0.95 }}
								animate={{ opacity: 1, height: 'auto', scale: 1 }}
								exit={{ opacity: 0, height: 0, scale: 0.95 }}
								transition={{ duration: 0.25, ease: 'easeInOut' }}
								className="ml-10 mt-1 space-y-1 overflow-hidden"
							>
								{node.children?.map((child) => (
									<Link
										key={child.path}
										to={child.path}
										className={`block grid grid-cols-[auto,1fr] gap-2 items-center text-sm p-2 rounded-md hover:bg-gray-800 hover:text-yellow-300 ${
											location.pathname.startsWith(child.path) ? 'text-yellow-300' : 'text-white'
										}`}
									>
										{child.icon}
										{child.name}
									</Link>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</SidebarItem>
			);
		});
	};

	return (
		<aside className="h-screen w-64 bg-[#1D3557] flex flex-col justify-between">
			<div>
				<Link to={'/home'}>
					<div className="p-6">
						<img src={logo} loading="lazy" alt="Logo" />
					</div>
				</Link>

				<List>
					{sidebarItems.map((item: IsidebarItem) => {
						const isDropdown = !!item.children;
						const isActive = item.to ? location.pathname.startsWith(item.to) : false;
						const isOpen = openDropdown === item.label;

						return (
							<SidebarItem
								key={item.label}
								item={item}
								isActive={isActive}
								isOpen={isOpen}
								toggleDropdown={toggleDropdown}
							>
								<AnimatePresence initial={false}>
									{isDropdown && isOpen && (
										<motion.div
											key={`${item.label}-dropdown`}
											initial={{ opacity: 0, height: 0, scale: 0.95 }}
											animate={{ opacity: 1, height: 'auto', scale: 1 }}
											exit={{ opacity: 0, height: 0, scale: 0.95 }}
											transition={{ duration: 0.25, ease: 'easeInOut' }}
											className="ml-10 mt-1 space-y-1 overflow-hidden"
										>
											{item.children?.map((child) => (
												<Link
													key={child.to}
													to={child.to}
													className={`block grid grid-cols-[auto,1fr] gap-2 items-center text-sm p-2 rounded-md hover:bg-gray-800 hover:text-yellow-300 ${
														location.pathname.startsWith(child.to) ? 'text-yellow-300' : 'text-white'
													}`}
												>
													{child.icon}
													{child.label}
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</SidebarItem>
						);
					})}
				</List>

				{/* <div className="p-6 border-t border-gray-700 flex items-center justify-between">
					<div>
						<div className="text-sm font-medium">Ann Smith</div>
						<div className="text-xs text-gray-400">Administrator</div>
					</div>
					<button className="text-gray-400 hover:text-white">Logout</button>
				</div> */}
			</div>
		</aside>
	);
}
