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
