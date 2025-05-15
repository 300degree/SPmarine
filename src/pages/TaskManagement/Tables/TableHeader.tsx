import { TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { TASKMANAGEMENTHEADER } from '@/constant/constants';
import { JSX } from 'react';

export default function TableHeaders(): JSX.Element {
	return (
		<TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
			<TableRow>
				{TASKMANAGEMENTHEADER.map((item, index) => (
					<TableCell
						key={item}
						isHeader
						className={`
							px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 ${
								index === TASKMANAGEMENTHEADER.length - 1 ? 'text-center' : 'text-start'
							}`}
					>
						{item}
					</TableCell>
				))}
			</TableRow>
		</TableHeader>
	);
}
