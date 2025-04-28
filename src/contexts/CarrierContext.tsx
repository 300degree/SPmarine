import { createContext } from 'react';

import { Carriers } from '@/constant/types/carrier';

type CarrierContextType = {
	data?: Carriers[];
	loading: boolean;
	error?: unknown;
};

const CarrierContext = createContext<CarrierContextType>({ loading: true });
export default CarrierContext;
