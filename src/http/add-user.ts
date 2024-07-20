import type { UserDTO } from '@/domain'
import { ClientHttp } from './http-client'

export async function addUser(data: UserDTO) {
	const res = await ClientHttp.post('users', {
		json: {
			...data,
		},
	})

	return res
}
