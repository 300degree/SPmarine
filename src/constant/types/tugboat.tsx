export type Tugboats = {
	id: string;
	name: string;
	maxCap: number;
	maxBarge: number;
	maxFuelCon: number;
	type: 'SEA' | 'RIVER';
	minSpeed: number;
	maxSpeed: number;
	rpm: number;
	hp: number;
	last: number;
	long: number;
	status: 'SEA' | 'RIVER';
	kilometer: number;
	readyDateTime: Date;
};
// Solution
// solution_id
