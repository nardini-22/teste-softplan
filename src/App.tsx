import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { userSchema, type userSchemaType } from './domain/user/user-model'
import { signIn } from './http/signin'

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<userSchemaType>({
		resolver: zodResolver(userSchema),
	})
	const navigate = useNavigate()

	const onSubmit = async (data: userSchemaType) => {
		try {
			const { accessToken } = await signIn(data.email, data.password)
			toast.success('Login efetuado com sucesso. Redirecionando...', {
				onAutoClose: () => {
					navigate('/users')
				},
			})
		} catch (error) {
			if (error instanceof HTTPError) {
				const message = await error.response.json()
				toast.error(message)
			}
		}
	}

	return (
		<>
			<Toaster position="top-right" richColors />
			<div className="flex justify-center items-center h-screen">
				<Card className="min-w-[500px] h-fit">
					<CardHeader className="text-center">
						<CardTitle>Login</CardTitle>
						<small className="text-sm leading-none">Faça o login para acessar nossa plataforma.</small>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
							<Input type="text" placeholder="Email" {...register('email')} errorMessage={errors.email?.message} />
							<Input
								type="password"
								placeholder="Senha"
								{...register('password')}
								errorMessage={errors.password?.message}
							/>
							<Button type="submit">Entrar</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default App
