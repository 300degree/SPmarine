import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import axios from 'axios';

import ScheduleContext from '@/contexts/ScheduleContext';
import { Schedule } from '@/constant/types/schedule';

export function ScheduleProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery<Schedule[]>({
		queryKey: ['schedule'],
		queryFn: async () => {
			return (await axios.get(`${__API_ENDPOINT__}/${__API_VERSION__}/schedule`)).data;
		},
	});

	return <ScheduleContext.Provider value={{ data, loading: isLoading }}>{children}</ScheduleContext.Provider>;
}
