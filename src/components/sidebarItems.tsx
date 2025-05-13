import {
	HiSquares2X2,
	HiUsers,
	HiChevronDown,
	HiChevronRight,
	HiOutlineChartPie,
	HiOutlineCog8Tooth,
	HiOutlineClipboardDocumentCheck,
} from 'react-icons/hi2';
import { ListItemPrefix, Typography } from '@material-tailwind/react';
import { GiCargoShip, GiFishingBoat } from 'react-icons/gi';
import { BsBoxSeam } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import type { SidebarItem } from '@/constant/interfaces';
import { Link } from 'react-router-dom';

export const sidebarItems: SidebarItem[] = [
	{
		label: 'Components',
		icon: <HiSquares2X2 />,
		children: [
			{ label: 'Barges', to: '/home/barges', icon: <GiCargoShip /> },
			{ label: 'Tugboats', to: '/home/tugboats', icon: <GiFishingBoat /> },
			{ label: 'Stations', to: '/home/stations', icon: <HiOutlineCog8Tooth /> },
			{ label: 'Customers', to: '/home/customers', icon: <HiUsers /> },
			{ label: 'Carriers', to: '/home/carriers', icon: <BsBoxSeam /> },
		],
	},
	{
		label: 'Orders',
		icon: <HiOutlineClipboardDocumentCheck />,
		to: '/home/orders',
	},
	{
		label: 'Results',
		icon: <HiOutlineChartPie />,
		to: '/home/results',
		children: [
			{ label: 'Tasks/schedule', to: '#' },
			{ label: 'Usage', to: '#' },
			{ label: 'Visualization', to: '/home/results/visualize' },
			{ label: 'Report', to: '#' },
		],
	},
];

interface Props {
	item: SidebarItem;
	isActive: boolean;
	isOpen: boolean;
	toggleDropdown: (label: string) => void;
	children?: ReactNode;
}

export default function SidebarItem({ item, isActive, isOpen, toggleDropdown, children }: Props) {
	const isDropdown = !!item.children;

	const baseClass = 'relative flex w-full p-3 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-yellow-300';
	const activeClass = isActive ? 'bg-gray-800 text-yellow-300' : 'text-white';

	const content = (
		<>
			<ListItemPrefix className="text-xl">{item.icon}</ListItemPrefix>
			<Typography className="text-sm flex-1">{item.label}</Typography>

			{isDropdown &&
				(isOpen ? (
					<HiChevronDown className="w-4 h-4 text-gray-400" />
				) : (
					<HiChevronRight className="w-4 h-4 text-gray-400" />
				))}
		</>
	);

	return (
		<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
			{isDropdown ? (
				<div onClick={() => toggleDropdown(item.label)} className={`${baseClass} ${activeClass}`}>
					{content}
				</div>
			) : item.to ? (
				<Link to={item.to} className={`${baseClass} ${activeClass}`}>
					{content}
				</Link>
			) : (
				<div className={`${baseClass} ${activeClass}`}>{content}</div>
			)}
			{children}
		</motion.div>
	);
}
