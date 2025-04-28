import { ReactNode } from 'react';

import { CustomerProvider } from './CustomerProvider';
import { CarrierProvider } from './CarrierProvider';
import { StationProvider } from './StationProvider';
import { TugboatProvider } from './TugboatProvider';
import { BargeProvider } from './BargeProvider';
import { OrderProvider } from './OrderProvider';

export default function AppProvider({ children }: { children: ReactNode }) {
	return (
		<>
			<OrderProvider>
				<StationProvider>
					<CustomerProvider>
						<CarrierProvider>
							<TugboatProvider>
								<BargeProvider>{children}</BargeProvider>
							</TugboatProvider>
						</CarrierProvider>
					</CustomerProvider>
				</StationProvider>
			</OrderProvider>
		</>
	);
}
