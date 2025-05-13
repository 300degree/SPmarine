import { ReactNode } from 'react';

import { CustomerProvider } from '@/provider/CustomerProvider';
import { CarrierProvider } from '@/provider/CarrierProvider';
import { StationProvider } from '@/provider/StationProvider';
import { TugboatProvider } from '@/provider/TugboatProvider';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { BargeProvider } from '@/provider/BargeProvider';
import { OrderProvider } from '@/provider/OrderProvider';

export default function AppProvider({ children }: { children: ReactNode }) {
	return (
		<>
			<OrderProvider>
				<StationProvider>
					<CustomerProvider>
						<CarrierProvider>
							<TugboatProvider>
								<BargeProvider children={children} />
							</TugboatProvider>
						</CarrierProvider>
					</CustomerProvider>
				</StationProvider>
			</OrderProvider>
		</>
	);
}
