"use client";

import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { Customer } from "@/types/customer";
import { http } from "@/http";

export interface CustomerContextType {
	customer?: Customer[];
	isError?: unknown;
	isLoading: boolean;
}

export interface CustomerProvidrProps {}

export const CustomerContext = createContext<CustomerContextType>({ isLoading: true });

export function CustomerProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Customer[]>({
		queryKey: ["customers"],
		queryFn: async () => {
			return (await http.get<Customer[]>("customers")).data;
		},
	});

	if (!data) return <></>;

	return (
		<CustomerContext.Provider value={{ customer: data, isLoading: isLoading }}>{children}</CustomerContext.Provider>
	);
}
