import { getUsers } from '@/http/get-users'
import { useQuery } from '@tanstack/react-query'

export const useFetchUsers = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['table-users'],
		queryFn: () => getUsers(),
	})

	return { data, isFetching }
}
