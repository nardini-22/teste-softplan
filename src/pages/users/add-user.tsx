import { Button, ControlledInput, ControlledSelect, DialogClose, DialogComponent, DialogFooter } from '@/components/ui'
import { type UserDTO, addUserSchema, type addUserSchemaType } from '@/domain/user/user-model'
import { addUser } from '@/http/add-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const AddUser = () => {
	const [open, setOpen] = useState<boolean>(false)
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<addUserSchemaType>({
		resolver: zodResolver(addUserSchema),
		defaultValues: {
			email: '',
			password: '',
			role: '',
		},
	})

	useEffect(() => {
		reset()
	}, [open])

	const queryClient = useQueryClient()

	const { mutate: handleAddUser, isPending } = useMutation({
		mutationFn: (data: UserDTO) => addUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['table-users'],
			})
			toast.success('Usuário cadastrado com sucesso')
			setOpen(false)
		},
		onError: async (error) => {
			if (error instanceof HTTPError) {
				const message = await error.response.json()
				toast.error(message)
			}
		},
	})

	const onSubmit = (data: addUserSchemaType) => {
		handleAddUser(data)
	}

	return (
		<DialogComponent
			title="Adicionar usuário"
			trigger={
				<Button className="gap-2" variant="outline">
					<PlusCircle />
					Adicionar usuário
				</Button>
			}
			open={open}
			onOpenChange={setOpen}
			content={
				<form onSubmit={handleSubmit(onSubmit)}>
					<ControlledInput
						control={control}
						name="email"
						type="email"
						placeholder="Email"
						errorMessage={errors.email?.message}
						disabled={isPending}
					/>
					<ControlledInput
						control={control}
						name="password"
						placeholder="Senha"
						errorMessage={errors.password?.message}
						disabled={isPending}
					/>
					<ControlledSelect
						control={control}
						name="role"
						placeholder="Cargo"
						options={[
							{
								text: 'Admin',
								value: 'admin',
							},
							{
								text: 'User',
								value: 'user',
							},
						]}
						errorMessage={errors.role?.message}
						disabled={isPending}
					/>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="ghost">Cancelar</Button>
						</DialogClose>
						<Button type="submit" loading={isPending}>
							Confirmar
						</Button>
					</DialogFooter>
				</form>
			}
		/>
	)
}

export default AddUser
