import { Button, type ButtonProps, buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn('mx-auto flex w-full justify-end', className)}
		{...props}
	/>
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
	({ className, ...props }, ref) => (
		<ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
	),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
	isActive?: boolean
} & Pick<ButtonProps, 'size'> &
	React.ComponentProps<'button'>

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
	<Button
		variant="ghost"
		aria-current={isActive ? 'page' : undefined}
		className={cn(
			buttonVariants({
				variant: isActive ? 'outline' : 'ghost',
				size,
			}),
			className,
		)}
		{...props}
	/>
)
PaginationLink.displayName = 'PaginationLink'

const PaginationFirstPage = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink aria-label="Go to first page" size="default" className={cn('', className)} {...props}>
		<ChevronsLeft className="size-4" />
	</PaginationLink>
)
PaginationFirstPage.displayName = 'PaginationFirstPage'

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink aria-label="Go to previous page" size="default" className={cn('', className)} {...props}>
		<ChevronLeft className="size-4" />
	</PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink aria-label="Go to next page" size="default" className={cn('', className)} {...props}>
		<ChevronRight className="size-4" />
	</PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationLastPage = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink aria-label="Go to last page" size="default" className={cn('', className)} {...props}>
		<ChevronsRight className="size-4" />
	</PaginationLink>
)
PaginationLastPage.displayName = 'PaginationLastPage'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
	<span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
		<MoreHorizontal className="size-4" />
	</span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationFirstPage,
	PaginationItem,
	PaginationLastPage,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
}
