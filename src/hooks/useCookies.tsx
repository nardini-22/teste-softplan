import type { UserDTO } from '@/domain'
import Cookies from 'js-cookie'
import { type JwtPayload, jwtDecode } from 'jwt-decode'

interface UseCookiesProps extends JwtPayload, UserDTO {}

export const useCookies = (): UseCookiesProps | undefined => {
	const cookies = Cookies.get('token')
	if (cookies) {
		return jwtDecode(cookies)
	}
}
