import type { AddUserDto } from '@/domain'
import { ClientHttp } from './http-client'

export async function addUser(data: AddUserDto) {
	const res = await ClientHttp.post('users', {
		json: {
			...data,
		},
	})

	return res
}
