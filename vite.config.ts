import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [{ find: '@', replacement: '/src' }],
	},
	server: {
		host: '0.0.0.0',
		port: Number(process.env.PORT) | 18000,
	},
	define: {
		__API_ENDPOINT__: JSON.stringify(process.env.__API_ENDPOINT__ || 'http://localhost:18001'),
		__API_VERSION__: JSON.stringify(process.env.__API_VERSION__ || 'v1'),
		__PUBLIC_ENDPOINT__: JSON.stringify(path.join(__dirname, './public')),
	},
});
