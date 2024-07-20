import { Button, ControlledInput, ControlledSelect, DialogClose, DialogComponent, DialogFooter } from '@/components/ui'
import { type EditUserDTO, editUserSchema, type editUserSchemaType } from '@/domain'
import { editUser } from '@/http/edit-user'
import { getUser } from '@/http/get-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface EditUserProps {
	editId: number
}

export default function EditUser({ editId }: EditUserProps) {
	const [open, setOpen] = useState<boolean>(false)
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useForm<editUserSchemaType>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			role: '',
		},
	})
	const queryClient = useQueryClient()

	const { data: formData, isFetching } = useQuery({
		queryKey: ['form-users', editId],
		queryFn: () => getUser(editId),
		enabled: open,
	})

	const { mutate: handleEditUser, isPending } = useMutation({
		mutationFn: (data: EditUserDTO) => editUser(data, editId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['table-users'],
			})
			queryClient.invalidateQueries({
				queryKey: ['form-users'],
			})
			toast.success('Usuário editado com sucesso')
			setOpen(false)
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

	const onSubmit = (data: editUserSchemaType) => {
		handleEditUser(data)
	}

	const loading = isFetching || isPending

	return (
		<DialogComponent
			title="Editar usuário"
			trigger={
				<Button variant="ghost" size="icon" tooltip="Editar usuário">
					<Pencil className="size-4" />
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
						disabled={true}
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
			}
		/>
	)
}
