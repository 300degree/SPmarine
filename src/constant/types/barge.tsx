export type Integer = number;
export type float = number;
export type double = number;

export type Barges = {
	id: string | number;
	name: string;
	weight: number;
	cap: number;
	last: number;
	long: number;
	waterStatus: 'SEA' | 'RIVER';
	station: string;
	kilometer: number;
	setupTime: number;
	readyDateTime: Date;
};
