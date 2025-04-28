import Papa from 'papaparse';

// import { Barges } from '@/types/barge';

export function ExportCSV<T>(data: T[], filename: string) {
	if (!data) return;
	try {
		// const csv = Papa.unparse(
		// 	data.map((val, _idx) => ({
		// 		ID: val.id,
		// 		NAME: val.name,
		// 		WEIGHT: val.weight,
		// 		CAP: val.cap,
		// 		LAT: val.last,
		// 		LNG: val.long,
		// 		'WATER STATUS': val.waterStatus,
		// 		STATION: val.station,
		// 		KM: val.kilometer,
		// 		'SETUP TIME': val.setupTime,
		// 		'READY DATETIME': val.readyDateTime,
		// 	})),
		// );
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
