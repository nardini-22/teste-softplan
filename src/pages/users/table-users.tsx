import SkeletonTableRow from '@/components/skeleton-table-row'
import {
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
import type { User } from '@/domain/user/user-model'
import { getUsers } from '@/http/get-users'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table'
import Cookies from 'js-cookie'
import { type JwtPayload, jwtDecode } from 'jwt-decode'
import { useMemo, useState } from 'react'
import AddUser from './add-user'
import DeleteUser from './delete-user'
import EditUser from './edit-user'

interface TokenProps extends JwtPayload, User {}

export const TableUsers = () => {
	const token: TokenProps = jwtDecode(Cookies.get('token')!)
	const roleValidation = token.role === 'admin'

	const { data: tableData, isFetching } = useQuery({
		queryKey: ['table-users'],
		queryFn: () => getUsers(),
	})

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const fallbackData: User[] = []
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
				cell: ({ row }) => {
					const userValidation = row.getValue('id') !== Number(token.sub)
					return (
						userValidation && (
							<div className="flex gap-2">
								<EditUser editId={row.getValue('id')} />
								<DeleteUser deleteId={row.getValue('id')} userEmail={row.getValue('email')} />
							</div>
						)
					)
				},
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
		initialState: {
			columnVisibility: {
				actions: roleValidation,
			},
		},
		state: {
			columnFilters,
		},
	})

	return (
		<div className="flex justify-center py-10">
			<Card className="w-1/2">
				<CardContent>
					<div className={cn(roleValidation && 'flex justify-between')}>
						<Input
							placeholder="Encontrar usuário..."
							value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
							onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
						/>
						{roleValidation && <AddUser />}
					</div>
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
							{isFetching ? (
								<SkeletonTableRow numberOfCol={3} />
							) : (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
										))}
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
