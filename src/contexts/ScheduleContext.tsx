import { createContext } from 'react';

import { Schedule } from '@/constant/types/schedule';

type ScheduleContextType = {
	data?: Schedule[];
	loading: boolean;
	error?: unknown;
};

const ScheduleContext = createContext<ScheduleContextType>({ loading: true });
export default ScheduleContext;
