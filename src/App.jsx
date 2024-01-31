import './utils/app'

import { createTheme } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import Loader from './components/Loader'

const SignIn = lazy(() => import('./components/SignIn'))
const SignUp = lazy(() => import('./components/SignUp'))
const About = lazy(() => import('./components/About'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const Post = lazy(() => import('./components/Post'))

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
			default: '#282A36',
			paper: '#282A36',
		},
	},
})

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<Loader />}>
				<SignIn theme={defaultTheme} />
			</Suspense>
		),
	},
	{
		path: '/signup',
		element: (
			<Suspense fallback={<Loader />}>
				<SignUp theme={defaultTheme} />
			</Suspense>
		),
	},
	{
		path: '/about',
		element: (
			<Suspense fallback={<Loader />}>
				<About />
			</Suspense>
		),
	},
	{
		path: '/dashboard',
		element: (
			<Suspense fallback={<Loader />}>
				<Layout />
			</Suspense>
		),
		children: [
			{
				path: '/dashboard',
				element: (
					<Suspense fallback={<Loader />}>
						<Dashboard />
					</Suspense>
				),
			},
			{
				path: '/dashboard/:id',
				element: (
					<Suspense fallback={<Loader />}>
						<Post />
					</Suspense>
				),
			},
		],
	},
])

const App = () => {
	return (
		<>
			<RouterProvider router={router}></RouterProvider>
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
