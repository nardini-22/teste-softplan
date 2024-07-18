import type { User } from '@/domain/user/user-model'
import { ClientHttp } from './http-client'

export async function editUser(data: User, id: number) {
	const res = await ClientHttp.put(`users/${id}`, {
		json: {
			...data,
		},
	})

	return res
}
