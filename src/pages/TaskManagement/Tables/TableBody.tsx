import { TableRow, TableCell } from '@/components/ui/table';
import { Tugboats } from '@/constant/types/tugboat';
import { Badge } from '@material-tailwind/react';
import { JSX } from 'react';

type Props = { item: Tugboats; index: number };

export default function TableBodys({ item, index }: Props): JSX.Element {
	return (
		<TableRow key={item.id}>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate max-w-3xs">
				{item.maxCap}
			</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
				{item.maxBarge}
			</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
				{item.maxFuelCon}
			</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.type}</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
				{item.minSpeed}
			</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
				{item.maxSpeed}
			</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.rpm}</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.hp}</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.last}</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.long}</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
				{item.status}
			</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
				{item.kilometer}
			</TableCell>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
				{new Date(item.readyDateTime).toLocaleString('th-TH', {
					timeZone: 'Asia/Bangkok',
					year: 'numeric',
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
				})}
			</TableCell>
		</TableRow>
	);
}
