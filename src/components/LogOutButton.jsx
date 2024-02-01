import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdLogout } from 'react-icons/md'

const LogOutButton = () => {
	const auth = getAuth() // Firebase auth
	const navigate = useNavigate() // Router hook to navigate

	/**
	 * Function to handle user logout by navigating to the root page,
	 * signing out the user, and displaying success or error toast messages.
	 */
	const handleLogOut = () => {
		// Signs out the user
		signOut(auth)
			.then(() => {
				toast.success('Signed out successfully')
			})
			.catch((error) => {
				toast.error(error.message)
			})

		// Navigates to the root page
		navigate('/')
	}

	return (
		<button
			className='p-2 text-white duration-150 rounded-lg md:p-3 hover:bg-red-700 bg-error tooltip tooltip-bottom'
			onClick={handleLogOut}
			data-tip='Sign out'
		>
			<MdLogout className='text-xl' />
		</button>
	)
}

export default LogOutButton
