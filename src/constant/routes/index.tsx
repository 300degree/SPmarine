import { lazy, ReactNode } from 'react';

/**
 * @brief
 *
 */
const HomeLayout = lazy(() => import('@/components/homeLayout'));
const AuthLayout = lazy(() => import('@/components/authLayout'));
const NotFound = lazy(() => import('@/pages/not-found'));

/**
 * @brief
 *
 */
const Home = lazy(() => import('@/pages/home'));
const Component = lazy(() => import('@/pages/home/components'));
const Barge = lazy(() => import('@/pages/home/components/barge'));
const Tugboat = lazy(() => import('@/pages/home/components/tugboat'));
const Station = lazy(() => import('@/pages/home/components/station'));
const Customer = lazy(() => import('@/pages/home/components/customer'));
const Carrier = lazy(() => import('@/pages/home/components/carrier'));

const Order = lazy(() => import('@/pages/home/orders'));

const Result = lazy(() => import('@/pages/home/results'));
const Usage = lazy(() => import('@/pages/home/results/usage'));
const Visual = lazy(() => import('@/pages/home/results/visualization'));
// const Report = lazy(() => import('@/pages/home/results/report'));
const TaskManagement = lazy(() => import('@/pages/TaskManagement/TaskManagement'));

/**
 * @brief
 *
 */
const SignUp = lazy(() => import('@/pages/auth/signup'));
const SignIn = lazy(() => import('@/pages/auth/signin'));

export type PageNode = {
	name: string;
	path: string;
	icon?: ReactNode;
	element?: ReactNode;
	children?: PageNode[];
};

export const siteMap: PageNode[] = [
	{
		name: 'Home',
		path: '/home',
		element: <HomeLayout />,
		children: [
			{ name: 'index', path: '', element: <Home /> },
			{ name: 'Components', path: 'components', element: <Component /> },
			{ name: 'Barges', path: 'barges', element: <Barge /> },
			// { name: 'Barges', path: 'barges', element: <TaskManagement /> }, // แก้เสร็จ เปลี่ยนกลับด้วย
			{ name: 'Tugboats', path: 'tugboats', element: <Tugboat /> },
			{ name: 'Stations', path: 'stations', element: <Station /> },
			{ name: 'Customers', path: 'customers', element: <Customer /> },
			{ name: 'Carriers', path: 'carriers', element: <Carrier /> },
			{ name: 'Orders', path: 'orders', element: <Order /> },
			{
				name: 'Resutls',
				path: 'results',
				children: [
					{ name: 'Tasks', path: 'tasks', element: <Result /> },
					{ name: 'Schedule', path: 'schedule', element: <TaskManagement /> },
					{ name: 'Usage', path: 'usage', element: <Usage /> },
					{ name: 'Visualize', path: 'visualize', element: <Visual /> },
					// { name: 'Report', path: 'report', element: <Report /> },
				],
			},
			{ name: '*', path: '*', element: <NotFound /> },
		],
	},
	{
		name: 'Auth',
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{ name: 'SignIn', path: 'signin', element: <SignIn /> },
			{ name: 'SignUp', path: 'signup', element: <SignUp /> },
		],
	},
];
