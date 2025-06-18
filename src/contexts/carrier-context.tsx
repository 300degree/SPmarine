"use client";

import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { Carrier } from "@/types/carrier";
import { http } from "@/http";

export interface CarrierContextType {
	carrier?: Carrier[];
	isError?: unknown;
	isLoading: boolean;
}

export interface CarrierProvidrProps {}

export const CarrierContext = createContext<CarrierContextType>({ isLoading: true });

export function CarrierProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Carrier[]>({
		queryKey: ["carriers"],
		queryFn: async () => {
			return (await http.get<Carrier[]>("carriers")).data;
		},
	});

	if (!data) return <></>;

	return <CarrierContext.Provider value={{ carrier: data, isLoading: isLoading }}>{children}</CarrierContext.Provider>;
}
