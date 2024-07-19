import { Skeleton, TableCell, TableRow } from './ui'

interface Props {
	numberOfCol: number
}

function SkeletonTableRow({ numberOfCol = 1 }: Props) {
	return (
		<TableRow>
			{Array.from({ length: numberOfCol }).map((_, i: number) => {
				return (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<TableCell key={i}>
						<Skeleton className="h-8 w-full rounded" />
					</TableCell>
				)
			})}
		</TableRow>
	)
}

export default SkeletonTableRow
