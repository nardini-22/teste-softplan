import Cookies from 'js-cookie'

export function Logout() {
	Cookies.remove('token')
	window.location.reload()
}
