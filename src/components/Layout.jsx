import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Header from './Header'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Layout = () => {
	const navigate = useNavigate() // Router hook to navigate
	const [user, setUser] = useState(null) // Contains the user data after getting it from firebase
	const location = useLocation() // Router hook to get the current location

	// When the component mounts, check if the user is logged in
	// If they are logged in, unlock the private routes
	// If they are not logged in, redirect them to the login page
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
				<TransitionGroup>
					<CSSTransition
						key={location.key}
						timeout={300}
						classNames='animate-fade animate-once'
					>
						<Outlet />
					</CSSTransition>
				</TransitionGroup>
			</div>
		)
	)
}

export default Layout
