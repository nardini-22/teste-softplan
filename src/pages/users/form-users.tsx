import { Button, ControlledInput, ControlledSelect } from '@/components/ui'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { type User, userSchema, type userSchemaType } from '@/domain/user/user-model'
import { addUser } from '@/http/add-user'
import { editUser } from '@/http/edit-user'
import { getUser } from '@/http/get-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface FormUsersProps {
	editId?: number
}

export const FormUsers = ({ editId }: FormUsersProps) => {
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useForm<userSchemaType>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			email: '',
			password: '',
			role: '',
		},
	})
	const queryClient = useQueryClient()

	const { data: formData, isFetching: formLoading } = useQuery({
		queryKey: ['form-users', editId],
		queryFn: () => getUser(editId!),
		enabled: editId !== undefined,
	})

	const { mutate: handleAddUser, isPending: addLoading } = useMutation({
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

	const { mutate: handleEditUser, isPending: editLoading } = useMutation({
		mutationFn: (data: User) => editUser(data, editId!),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['table-users'],
			})
			queryClient.invalidateQueries({
				queryKey: ['form-users'],
			})
			toast.success('Usuário editado com sucesso')
		},
		onError: async (error) => {
			if (error instanceof HTTPError) {
				const message = await error.response.json()
				toast.error(message)
			}
		},
	})

	useEffect(() => {
		if (formData) {
			Object.entries(formData).forEach(([name, value]: any) => setValue(name, value))
		}
	}, [formData])

	const onSubmit = (data: userSchemaType) => {
		if (editId) {
			handleEditUser(data)
		} else {
			handleAddUser(data)
		}
	}

	const loading = formLoading || addLoading || editLoading

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ControlledInput
				control={control}
				name="email"
				type="email"
				placeholder="Email"
				errorMessage={errors.email?.message}
				disabled={loading || !!editId}
			/>
			{!editId && (
				<ControlledInput
					control={control}
					name="password"
					placeholder="Senha"
					errorMessage={errors.password?.message}
					disabled={loading}
				/>
			)}
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
				disabled={loading}
			/>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="ghost">Cancelar</Button>
				</DialogClose>
				<Button type="submit" loading={loading}>
					Confirmar
				</Button>
			</DialogFooter>
		</form>
	)
}
