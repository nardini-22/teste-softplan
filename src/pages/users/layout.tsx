import Header from '@/components/header'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function PrivateLayout() {
	const user = Cookies.get('token')
	const navigate = useNavigate()

	useEffect(() => {
		!user && navigate('/')
	}, [user])

	return (
		<>
			<Header />
			<div className="flex justify-center py-10">
				<Outlet />
			</div>
		</>
	)
}
