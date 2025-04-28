import { createContext } from 'react';

import { Customers } from '@/constant/types/customer';

export type CustomerContextType = {
	data?: Customers[];
	loading: boolean;
	error?: unknown;
};

const CustomerContext = createContext<CustomerContextType>({ loading: true });
export default CustomerContext;
