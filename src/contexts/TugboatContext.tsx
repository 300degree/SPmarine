import { createContext } from 'react';

import { Tugboats } from '@/constant/types/tugboat';

export type TugboatContextType = {
	data?: Tugboats[];
	loading: boolean;
	error?: unknown;
};

const TugboatContext = createContext<TugboatContextType>({ loading: true });
export default TugboatContext;
