import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, ReactNode, Suspense } from 'react';

import AppProvider from '@/provider/AppProvider';
import LoadingPage from '@/pages/loading';

import HomeLayout from '@/components/homeLayout';
import AuthLayout from '@/components/authLayout';

const DashboardPage = lazy(() => import('@/pages/dashboard'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));
const SignUpPage = lazy(() => import('@/pages/auth/signup'));
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const CustomerPage = lazy(() => import('@/pages/customer'));
const TugboatPage = lazy(() => import('@/pages/tugboat'));
const BargePage = lazy(() => import('@/pages/barge'));
const OrderPage = lazy(() => import('@/pages/order'));

export default function App() {
	return (
		<AppProvider>
			<Suspense fallback={<LoadingPage />}>
				<Routes>
					<Route path="*" element={<Navigate to="/home" replace />} />

					<Route path="home" element={<HomeLayout />}>
						<Route index element={<Navigate to="dashboard" replace />} />
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="tugboats" element={<TugboatPage />} />
						<Route path="barges" element={<BargePage />} />
						<Route path="orders" element={<OrderPage />} />
						<Route path="customers" element={<CustomerPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Route>

					<Route path="auth" element={<AuthLayout />}>
						<Route index element={<Navigate to="signin" replace />} />
						<Route path="signup" element={<SignUpPage />} />
						<Route path="signin" element={<SignInPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</Suspense>
		</AppProvider>
	);
}
