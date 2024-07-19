import Cookies from 'js-cookie'
import ky from 'ky'

export const ClientHttp = ky.create({
	prefixUrl: 'https://teste-softplan-api.vercel.app/',
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
