import './utils/app'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { createTheme } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
	const defaultTheme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#FF8484',
			},
			secondary: {
				main: '#D97398',
			},
			background: {
				default: '#282828',
				paper: '#282828',
			},
		},
	})

	return (
		<>
			<SignUp theme={defaultTheme} />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
				transition:Bounce
			/>
		</>
	)
}

export default App
