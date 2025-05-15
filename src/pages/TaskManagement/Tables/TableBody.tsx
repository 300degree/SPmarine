import { TableRow, TableCell } from '@/components/ui/table';
import { Schedule } from '@/constant/types/schedule';
import { Badge } from '@material-tailwind/react';
import { JSX } from 'react';

type Props = { item: Schedule; index: number };

export default function TableBodys({ item, index }: Props): JSX.Element {
	return (
		<TableRow key={item.id}>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.id}</TableCell>
			<TableCell
				className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate max-w-3xs"
				children={item.name}
			/>
			<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" children={item.type} />
			<TableCell
				className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate max-w-3xs"
				children={item.speed}
			/>
			<TableCell
				className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
				children={item.total_load}
			/>
			<TableCell
				className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate max-w-3xs"
				children={item.barge_ids}
			/>
			<TableCell
				className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
				children={item.tugboat_id}
			/>
			<TableCell
				className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate max-w-3xs"
				children={item.order_id}
			/>
			<TableCell
				className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
				children={item.water_type}
			/>
			<TableCell
				className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate max-w-3xs"
				children={item.enter_datetime}
			/>
			<TableCell
				className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
				children={item.exit_datetime}
			/>
		</TableRow>
	);
}
