import { Button, Input } from '@/components/ui'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { type User, userSchema, type userSchemaType } from '@/domain/user/user-model'
import { addUser } from '@/http/add-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const FormUsers = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<userSchemaType>({
		resolver: zodResolver(userSchema),
	})
	const queryClient = useQueryClient()

	const { mutate: handleAddUser, isPending } = useMutation({
		mutationFn: (data: User) => addUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['table-users'],
			})
			toast.success('Usuário cadastrado com sucesso')
		},
		onError: async (error) => {
			if (error instanceof HTTPError) {
				const message = await error.response.json()
				toast.error(message)
			}
		},
	})

	const onSubmit = (data: userSchemaType) => {
		handleAddUser(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				type="email"
				placeholder="Email"
				{...register('email')}
				errorMessage={errors.email?.message}
				disabled={isPending}
			/>
			<Input
				placeholder="Senha"
				{...register('password')}
				errorMessage={errors.password?.message}
				disabled={isPending}
			/>
			<Input placeholder="Cargo" {...register('role')} errorMessage={errors.role?.message} disabled={isPending} />
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="ghost">Cancelar</Button>
				</DialogClose>
				<Button type="submit" loading={isPending}>
					Confirmar
				</Button>
			</DialogFooter>
		</form>
	)
}
