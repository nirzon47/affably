import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@emotion/react'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link as RouterLink } from 'react-router-dom'

const SignUp = (prop) => {
	const [loading, setLoading] = useState(false)
	const handleSubmit = (event) => {
		event.preventDefault()

		const auth = getAuth()
		const signUpForm = new FormData(event.currentTarget)
		setLoading(true)

		createUserWithEmailAndPassword(
			auth,
			signUpForm.get('email'),
			signUpForm.get('password')
		)
			.then((userCredential) => {
				const user = userCredential.user
				console.log(user)
				toast.success('Signed up successfully')
			})
			.catch((error) => {
				console.error(error)
				toast.error(error.message)
			})
			.finally(() => setLoading(false))
	}

	return (
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
}

export default SignUp
