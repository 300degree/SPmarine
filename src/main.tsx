import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import App from './App';
import './global.css';
import Layout from './components/homeLayout';

const queryclient = new QueryClient();
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryclient}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>,
);
