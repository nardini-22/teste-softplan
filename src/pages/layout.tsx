import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

export function Layout() {
	const user = Cookies.get('token')
	return (
		<>
			{user ? <Navigate to="/users" /> : <Navigate to="/" />}
			<Outlet />
		</>
	)
}
