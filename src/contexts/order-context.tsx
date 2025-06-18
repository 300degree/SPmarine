"use client";

import { createContext, ReactNode, useState } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";

import { Order } from "@/types/order";
import { http } from "@/http";

export interface OrderContextType {
	data?: Order[];
	isError?: unknown;
	isLoading: boolean;
	selected?: Order;
	getById?: (id: string) => Promise<void>;
}

export interface OrderProvidrProps {}

export const OrderContext = createContext<OrderContextType>({ isLoading: true });

export function OrderProvider({ children }: { children: ReactNode }) {
	const [selected, setSelected] = useState<Order>();
	const queryClient = new QueryClient();

	const { data, isLoading } = useQuery<Order[]>({
		queryKey: ["orders"],
		queryFn: async () => {
			return (await http.get<Order[]>("orders")).data;
		},
	});

	const getById = async (id: string) => {
		const cached = queryClient.getQueryData<Order[]>(["orders"])?.find((t) => t.id === id);
		if (cached) {
			setSelected(cached);
			return;
		}

		const res = await http.get<Order>(`orders/${id}`);
		setSelected(res.data);
	};

	if (!data) return <></>;

	return (
		<OrderContext.Provider
			value={{
				data: data,
				isLoading: isLoading,
				selected: selected,
				getById: getById,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
}
