import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import axios from 'axios';

import BargeContext from '@/contexts/BargesContext';
import { Barges } from '@/constant/types/barge';

export function BargeProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Barges[]>({
		queryKey: ['barges'],
		queryFn: async () => {
			return (await axios.get(`${__API_ENDPOINT__}/${__API_VERSION__}/barges`)).data;
		},
	});

	return <BargeContext.Provider value={{ data, loading: isLoading }}>{children}</BargeContext.Provider>;
}
