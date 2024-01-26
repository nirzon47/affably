import { getAuth } from 'firebase/auth'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Layout = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const auth = getAuth()
		if (!auth.currentUser) {
			navigate('/')
			toast.error('Sign in first!')
		}
	}, [])

	return (
		<div className='relative text-white'>
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout
