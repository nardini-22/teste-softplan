import type { UserDTO } from '@/domain'
import { ClientHttp } from './http-client'

export async function getUser(id: number) {
	return ClientHttp.get(`users/${id}`).json<UserDTO>()
}
