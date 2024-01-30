import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Layout = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)

	useEffect(() => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				setUser(user)
			} else {
				navigate('/')
			}
		})
	}, [])

	return (
		user && (
			<div className='relative text-white'>
				<Header logoutEnabled={true} />
				<Outlet />
			</div>
		)
	)
}

export default Layout
