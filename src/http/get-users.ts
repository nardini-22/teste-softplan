import type { UserDTO } from '@/domain'
import { ClientHttp } from './http-client'

export async function getUsers() {
	return ClientHttp.get('users').json<UserDTO[]>()
}
