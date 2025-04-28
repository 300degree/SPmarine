import { createContext } from 'react';

import { Orders } from '@/constant/types/order';

type OrderContextType = {
	data?: Orders[];
	loading: boolean;
	error?: unknown;
};

const OrderContext = createContext<OrderContextType>({ loading: true });
export default OrderContext;
