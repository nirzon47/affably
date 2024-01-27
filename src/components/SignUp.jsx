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
import { collection, doc, setDoc } from 'firebase/firestore'

const SignUp = (prop) => {
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState(null)

	const navigate = useNavigate()

	useEffect(() => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				setUser(user)
				navigate('/dashboard')
			}
		})
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault()

		const auth = getAuth()
		const signUpForm = new FormData(event.currentTarget)
		const userRef = collection(db, 'Users')

		const addInformation = async (id, username, pin) => {
			await setDoc(doc(userRef, id), {
				username: username,
				pin: pin,
				id: id,
			})
		}

		setLoading(true)

		createUserWithEmailAndPassword(
			auth,
			signUpForm.get('email'),
			signUpForm.get('password')
		)
			.then((userCredential) => {
				const user = userCredential.user
				console.log(user)

				addInformation(
					user.uid,
					signUpForm.get('username'),
					signUpForm.get('pin')
				)

				toast.success('Signed up successfully')
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
