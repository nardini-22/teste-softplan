import type { SignInDTO, UserDTO } from '@/domain'
import { ClientHttp } from './http-client'

interface Response {
	accessToken: string
	user: UserDTO
}

export async function signIn(data: SignInDTO) {
	const res = await ClientHttp.post('login', {
		json: {
			...data,
		},
	}).json<Response>()

	return res
}
