import { ReactNode } from 'react';

export interface SidebarItem {
	label: string;
	icon: React.ReactNode;
	to?: string;
	children?: {
		label: string;
		to: string;
		icon?: React.ReactNode;
	}[];
}
