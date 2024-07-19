import type { Login, User } from '@/domain/user/user-model'
import { ClientHttp } from './http-client'

interface Response {
	accessToken: string
	user: User
}

export async function signIn(data: Login) {
	const res = await ClientHttp.post('login', {
		json: {
			...data,
		},
	}).json<Response>()

	return res
}
