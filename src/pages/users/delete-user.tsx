import { Button, DialogClose, DialogComponent, DialogFooter } from '@/components/ui'
import { deleteUser } from '@/http/delete-user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DeleteUserProps {
	deleteId: number
	userEmail: string
}

export default function DeleteUser({ deleteId, userEmail }: DeleteUserProps) {
	const queryClient = useQueryClient()

	const { mutate: handleDeleteUser, isPending } = useMutation({
		mutationFn: (id: number) => deleteUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['table-users'],
			})
			toast.success('Usuário deletado com sucesso')
		},
		onError: async (error) => {
			if (error instanceof HTTPError) {
				const message = await error.response.json()
				toast.error(message)
			}
		},
	})
	return (
		<DialogComponent
			trigger={
				<Button variant="ghost" size="icon" tooltip="Remover usuário">
					<Trash2 className="size-4 text-red-500" />
				</Button>
			}
			title="Deletar usuário"
			content={
				<div>
					<p className="py-5">
						Deseja realmente deletar o usuário
						<span className="font-bold"> {userEmail}</span>? Essa ação não pode ser desfeita.
					</p>
					<DialogFooter>
						<DialogClose asChild>
							<Button disabled={isPending} variant="ghost">
								Cancelar
							</Button>
						</DialogClose>
						<Button loading={isPending} variant="destructive" onClick={() => handleDeleteUser(deleteId)}>
							Confirmar
						</Button>
					</DialogFooter>
				</div>
			}
		/>
	)
}
