import {
	Button,
	Dialog,
	IconButton,
	Typography,
	DialogBody,
	DialogHeader,
	DialogFooter,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useState, useEffect } from 'react';

import { ParseCSVFile } from '@/utils/importCSV';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export default function Modal({ isOpen, onClose }: Props) {
	const [fileName, setFileName] = useState<string | null>(null);
	const dropRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) setFileName(null);
	}, [isOpen]);

	const handleFile = (file: File) => {
		if (file && file.type === 'text/csv') {
			setFileName(file.name);
			ParseCSVFile(file);
		} else {
			alert('Please upload a valid CSV file.');
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			handleFile(e.dataTransfer.files[0]);
			e.dataTransfer.clearData();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			handleFile(e.target.files[0]);
		}
	};

	return (
		<Dialog size="sm" open={isOpen} handler={onClose} className="p-4">
			<DialogHeader className="relative m-0 block">
				<Typography variant="h4" color="blue-gray">
					Import File CSV Schedule
				</Typography>
				<IconButton size="sm" variant="text" className="!absolute right-3.5 top-3.5" onClick={onClose}>
					<XMarkIcon className="h-4 w-4 stroke-2" />
				</IconButton>
			</DialogHeader>

			<DialogBody className="space-y-6 pb-6">
				<div className="text-left">
					<Typography variant="h6" color="blue-gray" className="mb-2" children={'Dropzone'} />
					<div
						ref={dropRef}
						onDragOver={(e) => e.preventDefault()}
						onDrop={handleDrop}
						className="rounded-lg border-2 border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-md transition hover:border-blue-500"
					>
						<div className="mx-auto flex w-max items-center justify-center rounded-full bg-gray-100 p-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-8 w-8 text-gray-600"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<p className="mt-4 text-lg font-semibold text-gray-900">
							{fileName ? fileName : 'Drag & Drop CSV File Here'}
						</p>
						<p className="text-sm text-gray-600">or browse file below</p>
						<label
							htmlFor="file-upload"
							className="mt-3 inline-block cursor-pointer text-sm font-medium text-blue-600 hover:underline"
							children={'Browse File'}
						/>
						<input id="file-upload" type="file" accept=".csv" onChange={handleChange} className="hidden" />
					</div>
				</div>
			</DialogBody>

			<DialogFooter>
				<Button className="ml-auto" onClick={onClose} children={'Submit'} />
			</DialogFooter>
		</Dialog>
	);
}
