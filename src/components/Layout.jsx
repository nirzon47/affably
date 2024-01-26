import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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
				toast.error('Please sign in first')
			}
		})
	}, [])

	return (
		user && (
			<div className='relative text-white'>
				<Header />
				<Outlet />
			</div>
		)
	)
}

export default Layout
