import { Typography, Input } from '@material-tailwind/react';
import { IoSearchOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
	const { pathname } = useLocation();
	const [_layout, page] = pathname.split('/').filter((el) => el !== '');

	return (
		<nav className="w-full h-16 bg-[#f5f5f5] flex items-center justify-between px-6">
			<div className="capitalize text-xl font-semibold " children={page} />
			<div className="flex items-center gap-4 text-gray-500">
				{/* <Input label="Search" icon={<IoSearchOutline />} /> */}
				<Typography
					variant="h1"
					className="text-sm"
					children={new Date().toLocaleString('en-US', {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
					})}
				/>
			</div>
		</nav>
	);
}
