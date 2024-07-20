import type { EditUserDTO } from '@/domain'
import { ClientHttp } from './http-client'

export async function editUser(data: EditUserDTO, id: number) {
	const res = await ClientHttp.patch(`users/${id}`, {
		json: {
			...data,
		},
	})

	return res
}
