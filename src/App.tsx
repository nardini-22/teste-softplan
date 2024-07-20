import { TooltipProvider } from '@/components/ui'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { HTTPError } from 'ky'
import { RouterProvider } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
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
		queryCache: new QueryCache({
			onError: async (error) => {
				if (error instanceof HTTPError) {
					const message = await error.response.json()
					if (message === 'jwt expired') {
						Cookies.remove('token')
						window.location.reload()
					} else {
						toast.error('Não foi possível carregar as informações. Tente novamente mais tarde')
					}
				}
			},
		}),
	})
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster position="top-right" richColors />
				<RouterProvider router={router} />
			</TooltipProvider>
		</QueryClientProvider>
	)
}
