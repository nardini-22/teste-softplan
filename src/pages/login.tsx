import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui'
import { userSchema, type userSchemaType } from '@/domain/user/user-model'
import { signIn } from '@/http/signin'
import EditToken from '@/lib/edit-token'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { HTTPError } from 'ky'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

export function LoginPage() {
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
			const { accessToken, user } = await signIn(data.email, data.password)
			const editedToken = EditToken(accessToken, user.role)
			Cookies.set('token', editedToken, { expires: 1 })
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
