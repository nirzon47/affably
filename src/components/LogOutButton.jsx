import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdLogout } from 'react-icons/md'

const LogOutButton = () => {
	const auth = getAuth()
	const navigate = useNavigate()

	const handleLogOut = () => {
		navigate('/')

		signOut(auth)
			.then(() => {
				toast.success('Signed out successfully')
			})
			.catch((error) => {
				toast.error(error.message)
			})
	}

	return (
		<button
			className='p-2 text-white duration-150 rounded-lg md:p-3 hover:bg-red-700 bg-error'
			onClick={handleLogOut}
		>
			<MdLogout className='text-xl' />
		</button>
	)
}

export default LogOutButton
