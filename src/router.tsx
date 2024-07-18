import { Layout, LoginPage, UsersPage } from '@/pages'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		id: 'main',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <LoginPage />,
			},
			{
				path: '/users',
				element: <UsersPage />,
			},
		],
	},
])
