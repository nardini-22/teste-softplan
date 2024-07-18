import type { User } from '@/domain/user/user-model'
import { ClientHttp } from './http-client'

export async function addUser(data: User) {
	const res = await ClientHttp.post('users', {
		json: {
			...data,
		},
	})

	return res
}
