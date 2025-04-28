export type Orders = {
	id: string;
	type: string;
	from: string;
	dest: string;
	product: string;
	demand: number | string;
	startDateTime: Date;
	DueDateTime: Date;
	loadingRate: number;

	craneRate1: number;
	craneRate2: number;
	craneRate3: number;
	craneRate4: number;
	craneRate5: number;
	craneRate6: number;
	craneRate7: number;

	timeReadyCR1: number;
	timeReadyCR2: number;
	timeReadyCR3: number;
	timeReadyCR4: number;
	timeReadyCR5: number;
	timeReadyCR6: number;
	timeReadyCR7: number;
};
