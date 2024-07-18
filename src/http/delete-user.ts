import { ClientHttp } from './http-client'

export async function deleteUser(id: number) {
	const res = await ClientHttp.delete(`users/${id}`)

	return res
}
