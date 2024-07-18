import type { User } from '@/domain/user/user-model'
import { ClientHttp } from './http-client'

export async function getUsers() {
	return ClientHttp.get('users').json<User[]>()
}
