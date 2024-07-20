import { jwtDecode } from 'jwt-decode'
import sign from 'jwt-encode'

export default function editToken(token: string, role: string) {
	const jwtDecoded = jwtDecode(token)
	const newPayload = {
		...jwtDecoded,
		role: role,
	}
	const newToken = sign(newPayload, import.meta.env.VITE_JWT_SECRET)

	return newToken
}
