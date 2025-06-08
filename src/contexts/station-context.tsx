"use client";

import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Station } from "@/types/station";

export interface StationContextType {
	station?: Station[];
	isError?: unknown;
	isLoading: boolean;
	selected?: Station;
	getById?: (id: string) => Promise<void>;
}

export interface StationProvidrProps {}

export const StationContext = createContext<StationContextType>({ isLoading: true });

export function StationProvider({ children }: { children: ReactNode }) {
	const [selected, setSelected] = useState<Station>();
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<Station[]>({
		queryKey: ["stations"],
		queryFn: async () => {
			return (await axios.get(`${process.env.API_ENDPOINT}/${process.env.API_VERSION}/stations`)).data;
		},
	});

	const getById = async (id: string) => {
		const cached = queryClient.getQueryData<Station[]>(["stations"])?.find((t) => t.id === id);
		if (cached) {
			setSelected(cached);
			return;
		}

		const res = await axios.get(`${process.env.API_ENDPOINT}/${process.env.API_VERSION}/stations/${id}`);
		setSelected(res.data);
	};

	if (!data) return <></>;

	return (
		<StationContext.Provider
			value={{
				station: data,
				isLoading: isLoading,
				getById: getById,
				selected: selected,
			}}
		>
			{children}
		</StationContext.Provider>
	);
}