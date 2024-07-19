import { jwtDecode } from 'jwt-decode'
import sign from 'jwt-encode'

export default function EditToken(token: string, role: string) {
	const jwtDecoded = jwtDecode(token)
	const newPayload = {
		...jwtDecoded,
		role: role,
	}
	const secret = 'json-server-auth-123456'
	const newToken = sign(newPayload, secret)

	return newToken
}
