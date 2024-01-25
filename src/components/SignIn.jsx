import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'

const SignIn = (prop) => {
	const [loading, setLoading] = useState(false)
	const handleSubmit = (event) => {
		event.preventDefault()

		const auth = getAuth()
		const signInForm = new FormData(event.currentTarget)
		setLoading(true)

		signInWithEmailAndPassword(
			auth,
			signInForm.get('email'),
			signInForm.get('password')
		)
			.then((userCredential) => {
				console.log(userCredential)
			})
			.catch((error) => {
				console.error(error)
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
}

export default SignIn
