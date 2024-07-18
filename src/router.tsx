import App from '@/App'
import Layout from '@/components/layout'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		id: 'main',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <App />,
			},
			{
				path: '/users',
				element: <div>UsersPage</div>,
			},
		],
	},
])
