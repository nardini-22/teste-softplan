import { ClientHttp } from './http-client'

interface Response {
	accessToken: string
	user: {
		email: string
		role: string
		id: number
	}
}

export async function signIn(email: string, password: string) {
	const res = await ClientHttp.post('login', {
		json: {
			email,
			password,
		},
	}).json<Response>()

	return res
}
