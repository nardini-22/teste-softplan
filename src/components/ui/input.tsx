import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'
import { type Control, Controller } from 'react-hook-form'
import { Button } from './button'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string
	adornment?: JSX.Element
}

interface ControlledInputProps extends InputProps {
	control: Control<any>
	name: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, errorMessage, adornment, ...props }, ref) => {
		return (
			<div className="pb-1">
				<div
					className={cn(
						'flex items-center h-11 w-full outline-none rounded-md border border-input bg-background px-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
						className,
						errorMessage && 'border-destructive',
					)}
				>
					<input
						type={type}
						className={cn('py-1 size-full outline-none', errorMessage && 'text-destructive')}
						ref={ref}
						{...props}
					/>
					{adornment}
				</div>
				<p className="text-sm text-destructive h-5">{errorMessage}</p>
			</div>
		)
	},
)
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

const ControlledInputPassword = ({ control, name, ...props }: ControlledInputProps) => {
	const [hiddenPassword, setHiddenPassword] = React.useState(true)

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, ref } }) => (
				<Input
					{...props}
					type={hiddenPassword ? 'password' : 'text'}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					ref={ref}
					adornment={
						value && (
							<Button
								onClick={() => setHiddenPassword(!hiddenPassword)}
								type="button"
								className="rounded-full"
								variant="ghost"
								size="icon"
							>
								{hiddenPassword ? <Eye /> : <EyeOff />}
							</Button>
						)
					}
				/>
			)}
		/>
	)
}
ControlledInputPassword.displayName = 'ControlledInputPassword'

export { ControlledInput, ControlledInputPassword, Input }
