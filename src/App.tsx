import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { TooltipProvider } from './components/ui'
import { router } from './router'

export const App = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				retry: 1,
				staleTime: 5 * (60 * 1000),
				gcTime: 10 * (60 * 1000),
			},
		},
	})
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<RouterProvider router={router} />
			</TooltipProvider>
		</QueryClientProvider>
	)
}
