import { Button, Card, CardContent, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui"
import { User } from "@/domain/user/user-model"
import { getUsers } from "@/http/get-users"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table"
import { HTTPError } from "ky"
import { Pencil, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"

export const TableUsers = () => {
	const teste = async () => {
		try {
			const res = await getUsers()
			setData(res)
		} catch (error) {
			if (error instanceof HTTPError) {
				const message = await error.response.json()
			}
		}
	}

  const [data, setData] = useState<User[]>(() => [])
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
				enableHiding: false,
				cell: () => (
					<div className="flex">
						<Button variant="ghost" size="icon" tooltip="Editar usuário">
							<Pencil className="size-4" />
						</Button>
						<Button variant="ghost" size="icon" tooltip="Remover usuário">
							<Trash2 className="size-4 text-red-500" />
						</Button>
					</div>
				),
			},
		],
		[],
	)

	const table = useReactTable({
		columns,
		data: data ?? fallbackData,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	})


  return (
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
  )
}
