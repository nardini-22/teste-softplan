import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React, { type ReactNode } from 'react'
import { TooltipProvider } from '../src/components/ui'

export default function makeSut(children: ReactNode) {
	const queryClient = new QueryClient()
	return render(
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>{children}</TooltipProvider>
		</QueryClientProvider>,
	)
}
