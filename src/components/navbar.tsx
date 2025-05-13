import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { Typography, Input, Breadcrumbs } from '@material-tailwind/react';
import { useLocation, Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';

import { formatDate } from '@/utils/date';

export default function Navbar() {
	const { pathname } = useLocation();
	let [layout, page] = pathname.split('/').filter((el) => el !== '');
	if (!page) {
		page = '';
	}

	return (
		<nav className="w-full h-16 bg-[#EDF2F7] flex items-center justify-between px-6">
			<div className="capitalize text-xl font-semibold ">
				<Breadcrumbs fullWidth>
					<Link to={``} className="opacity-60">
						<Typography variant="h6" className="font-normal" children={layout} />
					</Link>
					<Link to={page}>
						<Typography variant="h6" className="font-normal" children={page} />
					</Link>
				</Breadcrumbs>
			</div>
			<div className="flex items-center gap-4 text-gray-500">
				{/* <Input label="Search" icon={<IoSearchOutline />} /> */}
				<Typography variant="h1" className="text-sm text-gray-800" children={formatDate(new Date())} />
			</div>
		</nav>
	);
}
