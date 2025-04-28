import { createContext } from 'react';

import { Stations } from '@/constant/types/station';

type StationContextType = {
	data?: Stations[];
	loading: boolean;
	error?: unknown;
};

const StationContext = createContext<StationContextType>({ loading: true });
export default StationContext;
