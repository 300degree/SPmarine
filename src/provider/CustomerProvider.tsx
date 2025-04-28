import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import axios from 'axios';

import CustomerContext from '@/contexts/CustomerContext';
import { Customers } from '@/constant/types/customer';

export function CustomerProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Customers[]>({
		queryKey: ['customers'],
		queryFn: async () => {
			return (await axios.get(`${__API_ENDPOINT__}/${__API_VERSION__}/customers`)).data;
		},
	});

	return <CustomerContext.Provider value={{ data, loading: isLoading }}>{children}</CustomerContext.Provider>;
}
