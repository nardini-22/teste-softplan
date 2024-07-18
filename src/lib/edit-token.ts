import { jwtDecode } from 'jwt-decode'

export default function EditToken(token: string, role: string) {
	const splittedToken = token.split('.')
	const jwtDecoded = jwtDecode(token)
	const newPayload = {
		...jwtDecoded,
		role: role,
	}
	const newJwtPayload = btoa(JSON.stringify(newPayload))

	return `${splittedToken[0]}.${newJwtPayload.replace('=', '')}.${splittedToken[2]}`
}
