import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function LoginLayout() {
	const user = Cookies.get('token')
	const navigate = useNavigate()

	useEffect(() => {
		user && navigate('/users')
	}, [user])

	return <Outlet />
}
