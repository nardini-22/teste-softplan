import type { User } from '@/domain/user/user-model'
import { ClientHttp } from './http-client'

export async function getUser(id: number) {
	return ClientHttp.get(`users/${id}`).json<User>()
}
