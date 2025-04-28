import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import axios from 'axios';

import TugboatContext from '@/contexts/TugboatContext';
import { Tugboats } from '@/constant/types/tugboat';

export function TugboatProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Tugboats[]>({
		queryKey: ['tugboats'],
		queryFn: async () => {
			return (await axios.get(`${__API_ENDPOINT__}/${__API_VERSION__}/tugboats`)).data;
		},
	});

	return <TugboatContext.Provider value={{ data, loading: isLoading }}>{children}</TugboatContext.Provider>;
}
