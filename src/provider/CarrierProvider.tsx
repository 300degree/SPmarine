import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import axios from 'axios';

import CarrierContext from '@/contexts/CarrierContext';
import { Carriers } from '@/constant/types/carrier';

export function CarrierProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Carriers[]>({
		queryKey: ['carrier'],
		queryFn: async () => {
			return (await axios.get(`${__API_ENDPOINT__}/${__API_VERSION__}/carriers`)).data;
		},
	});

	return <CarrierContext.Provider value={{ data, loading: isLoading }}>{children}</CarrierContext.Provider>;
}
