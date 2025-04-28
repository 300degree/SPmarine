import { createContext } from 'react';

import { Barges } from '@/constant/types/barge';

type BargeContextType = {
	data?: Barges[];
	loading: boolean;
	error?: unknown;
};

const BargeContext = createContext<BargeContextType>({ loading: true });
export default BargeContext;
