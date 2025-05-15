import Papa from 'papaparse';

export async function ParseCSVFile<T>(file: File): Promise<T[]> {
	return new Promise((resolve, reject) =>
		Papa.parse<T>(file, {
			header: true,
			skipEmptyLines: true,
			complete: (result) => resolve(result.data),
			error: (e) => reject(e),
		}),
	);
}
