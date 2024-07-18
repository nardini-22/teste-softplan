import type { Login } from '@/domain/user/user-model'
import { ClientHttp } from './http-client'

interface Response {
	accessToken: string
}

export async function signIn(data: Login) {
	const res = await ClientHttp.post('login', {
		json: {
			...data,
		},
	}).json<Response>()

	return res
}
