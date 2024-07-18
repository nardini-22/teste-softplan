import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

export default function Layout() {
	const token = Cookies.get('token')
	return (
		<>
			{!token && <Navigate to="/" />}
			<Outlet />
		</>
	)
}
