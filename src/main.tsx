import { TooltipProvider } from '@/components/ui'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './globals.css'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<TooltipProvider>
		<RouterProvider router={router} />
		</TooltipProvider>
	</React.StrictMode>,
)
