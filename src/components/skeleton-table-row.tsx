import { Skeleton, TableCell, TableRow } from './ui'

interface SkeletonTableRowProps {
	numberOfCol: number
}

function SkeletonTableRow({ numberOfCol = 1 }: SkeletonTableRowProps) {
	return (
		<TableRow data-testid="loader">
			{Array.from({ length: numberOfCol }).map((_, i: number) => {
				return (
					<TableCell key={i}>
						<Skeleton className="h-8 w-full rounded" />
					</TableCell>
				)
			})}
		</TableRow>
	)
}

export default SkeletonTableRow
