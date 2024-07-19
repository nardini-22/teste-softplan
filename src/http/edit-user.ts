import type { EditUser } from '@/domain/user/user-model'
import { ClientHttp } from './http-client'

export async function editUser(data: EditUser, id: number) {
	const res = await ClientHttp.patch(`users/${id}`, {
		json: {
			...data,
		},
	})

	return res
}
