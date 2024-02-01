import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@emotion/react'
import {
	getAuth,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth'
import { db } from '../utils/app'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'

const SignUp = (prop) => {
	const [loading, setLoading] = useState(false) // Flag to show loader
	const [user, setUser] = useState(null) // Contains the user data after getting it from firebase
	const navigate = useNavigate() // Router hook to navigate

	// When the component mounts, check if the user is logged in, and get the user data from firebase
	useEffect(() => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				setUser(user)
				navigate('/dashboard')
			}
		})
	}, [])

	/**
	 * Asynchronously handles form submission, including user authentication and
	 * signing up.
	 *
	 * @param {Event} event - The form submission event
	 * @return {void}
	 */
	const handleSubmit = async (event) => {
		event.preventDefault()

		const auth = getAuth() // Firebase auth
		const signUpForm = new FormData(event.currentTarget) // Form data
		const userRef = collection(db, 'Users') // Refers to the 'Users' collection
		const userSnap = await getDocs(userRef) // Gets all the users

		// Iterating over the 'Users' collection to check if the username already exists
		userSnap.forEach((user) => {
			if (user.data().username === signUpForm.get('username')) {
				toast.error('Username already exists')
				return
			}
		})

		// Adds a new user to the 'Users' collection
		/**
		 * Adds information to the database for the given user.
		 *
		 * @param {string} id - The user's ID
		 * @param {string} username - The user's username
		 * @param {string} pin - The user's PIN
		 * @return {Promise<void>} A promise that resolves when the information is added to the database
		 */
		const addInformation = async (id, username, pin) => {
			await setDoc(doc(userRef, id), {
				username: username,
				pin: pin,
				id: id,
			})
		}

		setLoading(true)

		// Creates a new user with the given email and password
		createUserWithEmailAndPassword(
			auth,
			signUpForm.get('email'),
			signUpForm.get('password')
		)
			.then((userCredential) => {
				const user = userCredential.user
				console.log(user)

				// Makes a new sub collection in the 'Users' collection
				addInformation(
					user.uid,
					signUpForm.get('username'),
					signUpForm.get('pin')
				)

				toast.success('Signed up successfully')
				// Redirects the user to the dashboard
				navigate('/dashboard')
			})
			.catch((error) => {
				console.error(error)
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
						<Avatar sx={{ m: 1 }} src='/logo.png' />
						<Typography component='h1' variant='h5'>
							Sign Up
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
								id='username'
								label='User Name'
								name='username'
								autoComplete='username'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								id='pin'
								label='PIN'
								name='pin'
								autoComplete='pin'
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
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
								Sign Up
							</Button>
							<Grid container>
								<Grid item xs />
								<Grid item>
									<RouterLink
										to={'/'}
										className='duration-500 hover:text-sky-500 text-primary'
									>
										{'Have an Account? Sign In'}
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

export default SignUp
