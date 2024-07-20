import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui'
import { type SignInDTO, signInSchema, type signInSchemaType } from '@/domain'
import { signIn } from '@/http/signin'
import EditToken from '@/lib/edit-token'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { HTTPError } from 'ky'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<signInSchemaType>({
		resolver: zodResolver(signInSchema),
	})
	const navigate = useNavigate()

	const { mutate: handleSignIn, isPending } = useMutation({
		mutationFn: (data: SignInDTO) => signIn(data),
		onSuccess: ({ accessToken, user }) => {
			const newToken = EditToken(accessToken, user.role)
			Cookies.set('token', newToken, { expires: 1 })
			navigate('/users')
		},
		onError: async (error) => {
			if (error instanceof HTTPError) {
				const message = await error.response.json()
				toast.error(message)
			}
		},
	})

	const onSubmit = async (data: signInSchemaType) => {
		handleSignIn(data)
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="min-w-[500px] h-fit">
				<CardHeader className="text-center">
					<CardTitle>Login</CardTitle>
					<small className="text-sm leading-none">Faça o login para acessar nossa plataforma.</small>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
						<Input
							type="text"
							placeholder="Email"
							{...register('email')}
							errorMessage={errors.email?.message}
							disabled={isPending}
						/>
						<Input
							type="password"
							placeholder="Senha"
							{...register('password')}
							errorMessage={errors.password?.message}
							disabled={isPending}
						/>
						<Button type="submit" loading={isPending}>
							Entrar
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
