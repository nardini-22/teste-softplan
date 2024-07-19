import type { User } from '@/domain/user/user-model'
import Cookies from 'js-cookie'
import { type JwtPayload, jwtDecode } from 'jwt-decode'

interface UseCookiesProps extends JwtPayload, User {}

export const useCookies = (): UseCookiesProps | undefined => {
	const cookies = Cookies.get('token')
	if (cookies) {
		return jwtDecode(cookies)
	}
}
