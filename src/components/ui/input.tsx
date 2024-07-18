import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, errorMessage, ...props }, ref) => {
	return (
		<div>
			<input
				type={type}
				className={cn(
					'flex h-10 w-full outline-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
					className,
					errorMessage && 'border-destructive text-destructive',
				)}
				ref={ref}
				{...props}
			/>
			<p className="text-sm text-destructive h-5">{errorMessage}</p>
		</div>
	)
})
Input.displayName = 'Input'

export { Input }
