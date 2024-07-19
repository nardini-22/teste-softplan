import * as React from 'react'

import { cn } from '@/lib/utils'
import { type Control, Controller } from 'react-hook-form'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string
}

interface ControlledInputProps extends InputProps {
	control: Control<any>
	name: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, errorMessage, ...props }, ref) => {
	return (
		<div className="pb-1">
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

const ControlledInput = ({ control, name, ...props }: ControlledInputProps) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, ref } }) => (
				<Input {...props} onChange={onChange} onBlur={onBlur} value={value} ref={ref} />
			)}
		/>
	)
}
ControlledInput.displayName = 'ControlledInput'

export { ControlledInput, Input }
