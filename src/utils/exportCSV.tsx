import Papa from 'papaparse';

export function ExportCSV<T>(data: T[], filename: string) {
	if (!data) return;
	try {
		const csv = Papa.unparse(data);
		const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `${filename}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (e) {
		console.error(e);
		return;
	}
}

export function importFile<T>(file: File, onComplete: (data: T[]) => void, onError?: (err: unknown) => void) {
	const fileExtension = file.name.split('.').pop()?.toLowerCase();

	if (fileExtension !== 'csv') {
		const error = new Error('Only CSV files are supported');
		onError?.(error);
		return;
	}

	const reader = new FileReader();

	reader.onload = (e) => {
		const result = e.target?.result;

		try {
			if (typeof result !== 'string') {
				throw new Error('File read result is not a string');
			}

			Papa.parse<T>(result, {
				header: true,
				skipEmptyLines: true,
				complete: (results) => {
					onComplete(results.data);
				},
				error: (err: any) => {
					if (onError) onError(err);
					else console.error(err);
				},
			});
		} catch (err) {
			onError?.(err);
		}
	};

	reader.readAsText(file);
}
