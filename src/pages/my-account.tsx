import {
	Avatar,
	AvatarFallback,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	Button,
	Card,
	CardContent,
	ControlledInputPassword,
} from '@/components/ui'
import { type EditUserDTO, changePasswordSchema, type changePasswordSchemaType } from '@/domain/user/user-model'
import { useCookies } from '@/hooks/useCookies'
import { editUser } from '@/http/edit-user'
import capitalizeFirstLetter from '@/lib/capitalize-first-letter'
import getUserAvatar from '@/lib/get-user-avatar'
import { logout } from '@/lib/logout'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const MyAccountPage = () => {
	const cookies = useCookies()
	const queryClient = useQueryClient()

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<changePasswordSchemaType>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			password: '',
			confirm_password: '',
		},
	})

	const { mutate: handleChangePassword, isPending } = useMutation({
		mutationFn: (data: EditUserDTO) => editUser(data, Number(cookies?.sub)),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['table-users'],
			})
			queryClient.invalidateQueries({
				queryKey: ['form-users'],
			})
			toast.success('Senha atualizada com sucesso ')
			logout()
		},
		onError: async (error) => {
			if (error instanceof HTTPError) {
				const message = await error.response.json()
				toast.error(message)
			}
		},
	})

	const onSubmit = (data: changePasswordSchemaType) => {
		handleChangePassword({ password: data.password })
	}

	return (
		<Card className="w-1/2">
			<CardContent className="flex flex-col items-center">
				<Breadcrumb className="flex flex-start w-full">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/users">Usuários</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink className="hover:text-current font-bold">Perfil</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="w-1/2">
					<div className="flex flex-col items-center gap-5">
						<Avatar className="size-40">
							<AvatarFallback>
								<span className="text-[40px]">{getUserAvatar(cookies?.email)}</span>
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col gap-2 items-center">
							<p className="font-bold">{cookies?.email}</p>
							<p>{capitalizeFirstLetter(cookies?.role)}</p>
						</div>
					</div>
					<form className="py-5" onSubmit={handleSubmit(onSubmit)}>
						<ControlledInputPassword
							control={control}
							name="password"
							placeholder="Nova senha"
							errorMessage={errors.password?.message}
							disabled={isPending}
						/>
						<ControlledInputPassword
							control={control}
							name="confirm_password"
							placeholder="Confirmar senha"
							errorMessage={errors.confirm_password?.message}
							disabled={isPending}
						/>
						<Button className="w-full" loading={isPending}>
							Atualizar
						</Button>
					</form>
				</div>
			</CardContent>
		</Card>
	)
}
