"use client";

import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { Station } from "@/types/station";
import { http } from "@/http";

export interface StationContextType {
	station?: Station[];
	isError?: unknown;
	isLoading: boolean;
}

export interface StationProvidrProps {}

export const StationContext = createContext<StationContextType>({ isLoading: true });

export function StationProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Station[]>({
		queryKey: ["stations"],
		queryFn: async () => {
			return (await http.get<Station[]>("stations")).data;
		},
	});

	if (!data) return <></>;

	return <StationContext.Provider value={{ station: data, isLoading: isLoading }}>{children}</StationContext.Provider>;
}