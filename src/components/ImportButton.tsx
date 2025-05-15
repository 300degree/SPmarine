import { importFile } from '@/utils/exportCSV';
import { Button } from '@material-tailwind/react';
import { useRef } from 'react';
import { HiOutlineArrowUpTray } from 'react-icons/hi2';

export default function ImportButton() {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		importFile<any>(
			file,
			(data) => {
				console.log(data);
			},
			(err) => {
				console.error(err);
			},
		);
	};

	return (
		<>
			<Button className="flex items-center gap-2" onClick={handleClick}>
				<HiOutlineArrowUpTray className="w-4 h-4" />
				IMPORT
			</Button>
			<input type="file" accept=".csv,.xlsx,.xls" ref={inputRef} onChange={handleFileChange} className="hidden" />
		</>
	);
}
