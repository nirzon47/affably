import { Button } from '@mui/material'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
		<Button variant='contained' color='error' onClick={handleLogOut}>
			Log Out
		</Button>
	)
}

export default LogOutButton
