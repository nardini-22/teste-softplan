import {
	Button,
	Card,
	CardContent,
	Input,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui'
import { DialogComponent, DialogFooter } from '@/components/ui/dialog'
import type { User } from '@/domain/user/user-model'
import { deleteUser } from '@/http/delete-user'
import { getUsers } from '@/http/get-users'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { HTTPError } from 'ky'
import { Pencil, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { FormUsers } from './form-users'

export const TableUsers = () => {
	const queryClient = useQueryClient()

	const { data: tableData } = useQuery({
		queryKey: ['table-users'],
		queryFn: () => getUsers(),
	})

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

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const fallbackData: User[] = []
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const columns: ColumnDef<User>[] = useMemo(
		() => [
			{
				header: 'Id do usuário',
				accessorKey: 'id',
			},
			{
				header: 'Email do usuário',
				accessorKey: 'email',
			},
			{
				id: 'actions',
				enableHiding: false,
				cell: ({ row }) => (
					<div className="flex">
						<Button variant="ghost" size="icon" tooltip="Editar usuário">
							<Pencil className="size-4" />
						</Button>
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
										<span className="font-bold"> {row.getValue('email')}</span>? Essa ação não pode ser desfeita.
									</p>
									<DialogFooter>
										<DialogClose asChild>
											<Button disabled={isPending} variant="ghost">
												Cancelar
											</Button>
										</DialogClose>
										<Button
											loading={isPending}
											className="bg-red-500"
											onClick={() => handleDeleteUser(row.getValue('id'))}
										>
											Confirmar
										</Button>
									</DialogFooter>
								</div>
							}
						/>
					</div>
				),
			},
		],
		[],
	)

	const table = useReactTable({
		columns,
		data: tableData ?? fallbackData,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	})

	return (
		<>
			<DialogComponent trigger={<Button>Criar usuário</Button>} title="Criar usuário" content={<FormUsers />} />
			<Card className="w-[500px]">
				<CardContent>
					<Input
						placeholder="Encontrar usuário..."
						value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
						onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
						className="max-w-sm"
					/>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id} className="w-[100px]">
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	)
}
