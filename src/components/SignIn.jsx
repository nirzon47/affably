import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const SignIn = (prop) => {
	const [loading, setLoading] = useState(false) // Flag to show loader
	const [user, setUser] = useState(null) // Contains the user data after getting it from firebase
	const navigate = useNavigate() // Router hook to navigate
	const auth = getAuth() // Firebase auth

	// When the component mounts, check if the user is logged in
	// If they are logged in, redirect them to the dashboard
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
				navigate('/dashboard')
			}
		})
	}, [])

	/**
	 * Asynchronously handles form submission, signs in the user, and navigates to dashboard on success.
	 *
	 * @param {Event} event - the form submission event
	 * @return {Promise} a Promise that resolves when the function completes
	 */
	const handleSubmit = async (e) => {
		e.preventDefault()

		const signInForm = new FormData(e.currentTarget) // Form data
		setLoading(true) // Shows the loader

		// Signs in the user
		signInWithEmailAndPassword(
			auth,
			signInForm.get('email'),
			signInForm.get('password')
		)
			.then((userCredential) => {
				console.log(userCredential)
				toast.success('Signed in successfully')

				// Navigates to dashboard
				navigate('/dashboard')
			})
			.catch((error) => {
				toast.error(error.message)
			})
			.finally(() => setLoading(false))
	}

	return (
		!user && (
			<ThemeProvider theme={prop.theme}>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar src='/logo.png' sx={{ m: 1 }} />
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box
							component='form'
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
								disabled={loading}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs />
								<Grid item>
									<RouterLink
										to='/signUp'
										className='duration-500 hover:text-sky-500 text-primary'
									>
										{"Don't have an account? Sign Up"}
									</RouterLink>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		)
	)
}

export default SignIn
