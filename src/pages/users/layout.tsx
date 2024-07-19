import Header from '@/components/header'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function UsersLayout() {
	const user = Cookies.get('token')
	const navigate = useNavigate()

	useEffect(() => {
		!user && navigate('/')
	}, [user])

	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
