import { LoginLayout, LoginPage, UsersLayout, UsersPage } from '@/pages'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		id: 'login',
		element: <LoginLayout />,
		children: [
			{
				path: '/',
				element: <LoginPage />,
			},
		],
	},
	{
		id: 'users',
		element: <UsersLayout />,
		children: [
			{
				path: '/users',
				element: <UsersPage />,
			},
		],
	},
])
