import Cookies from 'js-cookie'
import ky from 'ky'

export const ClientHttp = ky.create({
	prefixUrl: import.meta.env.VITE_PUBLIC_API_URL,
	hooks: {
		beforeRequest: [
			async (req) => {
				const token = Cookies.get('token')

				if (token) {
					req.headers.set('Authorization', `Bearer ${token}`)
				}
			},
		],
	},
})
