import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import axios from 'axios';

import OrderContext from '@/contexts/OrderContext';
import { Orders } from '@/constant/types/order';

export function OrderProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Orders[]>({
		queryKey: ['orders'],
		queryFn: async () => {
			return (await axios.get(`${__API_ENDPOINT__}/${__API_VERSION__}/orders`)).data;
		},
	});

	return <OrderContext.Provider value={{ data, loading: isLoading }}>{children}</OrderContext.Provider>;
}
