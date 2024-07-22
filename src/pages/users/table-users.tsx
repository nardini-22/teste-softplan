import SkeletonTableRow from '@/components/skeleton-table-row'
import {
	Badge,
	Card,
	CardContent,
	Input,
	Pagination,
	PaginationContent,
	PaginationFirstPage,
	PaginationItem,
	PaginationLastPage,
	PaginationNext,
	PaginationPrevious,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui'
import type { UserDTO } from '@/domain'
import { useCookies } from '@/hooks/useCookies'
import { useFetchUsers } from '@/hooks/useFetchUsers'
import capitalizeFirstLetter from '@/lib/capitalize-first-letter'
import { cn } from '@/lib/utils'
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import AddUser from './add-user'
import DeleteUser from './delete-user'
import EditUser from './edit-user'

export const TableUsers = () => {
	const cookies = useCookies()
	const roleValidation = cookies?.role === 'admin'

	const { data: tableData, isFetching } = useFetchUsers()

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 5,
	})
	const fallbackData: UserDTO[] = []
	const columns: ColumnDef<UserDTO>[] = useMemo(
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
				header: 'Perfil do usuário',
				id: 'role',
				cell: ({ row }) => <Badge variant="outline">{capitalizeFirstLetter(row.original.role)}</Badge>,
			},
			{
				id: 'actions',
				cell: ({ row }) => {
					const userValidation = row.original.id !== Number(cookies?.sub)
					return (
						userValidation && (
							<div data-testid="action" className="flex gap-2">
								<EditUser editId={row.original.id} />
								<DeleteUser deleteId={row.original.id} userEmail={row.original.email} />
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
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		initialState: {
			columnVisibility: {
				actions: roleValidation,
			},
		},
		state: {
			columnFilters,
			pagination,
		},
	})

	return (
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
							<SkeletonTableRow data-testid="loader" numberOfCol={roleValidation ? 3 : 2} />
						) : (
							table.getRowModel().rows.map((row) => (
								<TableRow data-testid="table-body-row" key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
				{table.options.data.length !== 0 && (
					<div className="pt-2">
						<Pagination>
							<PaginationContent>
								<small>
									Página{' '}
									<span className="font-bold">
										{table.getState().pagination.pageIndex + 1} de {table.getPageCount().toLocaleString()}
									</span>
								</small>
								<PaginationItem>
									<PaginationFirstPage onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()} />
								</PaginationItem>
								<PaginationItem>
									<PaginationPrevious onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
								</PaginationItem>
								<PaginationItem>
									<PaginationNext
										data-testid="pagination-next-button"
										onClick={() => table.nextPage()}
										disabled={!table.getCanNextPage()}
									/>
								</PaginationItem>
								<PaginationItem>
									<PaginationLastPage onClick={() => table.lastPage()} disabled={!table.getCanNextPage()} />
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
