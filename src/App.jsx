import './utils/app'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { createTheme } from '@mui/material/styles'

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
		</>
	)
}

export default App
