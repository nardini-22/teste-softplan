import { LoginPage, MyAccountPage, PrivateLayout, PublicLayout, UsersPage } from '@/pages'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		id: 'public',
		element: <PublicLayout />,
		children: [
			{
				path: '/',
				element: <LoginPage />,
			},
		],
	},
	{
		id: 'private',
		element: <PrivateLayout />,
		children: [
			{
				path: '/users',
				element: <UsersPage />,
			},
			{
				path: '/my-account',
				element: <MyAccountPage />,
			},
		],
	},
])
