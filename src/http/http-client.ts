import ky from 'ky'

export const ClientHttp = ky.create({
	prefixUrl: 'http://localhost:3000',
})
