import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import axios from 'axios';

import StationContext from '@/contexts/StationContext';
import { Stations } from '@/constant/types/station';

export function StationProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Stations[]>({
		queryKey: ['station'],
		queryFn: async () => {
			return (await axios.get(`${__API_ENDPOINT__}/${__API_VERSION__}/stations`)).data;
		},
	});

	return <StationContext.Provider value={{ data, loading: isLoading }}>{children}</StationContext.Provider>;
}
