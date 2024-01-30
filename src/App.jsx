import './utils/app'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { createTheme } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Post from './components/Post'
import About from './components/About'

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
		element: <SignIn theme={defaultTheme} />,
	},
	{
		path: '/signup',
		element: <SignUp theme={defaultTheme} />,
	},
	{
		path: '/about',
		element: <About />,
	},
	{
		path: '/dashboard',
		element: <Layout />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/dashboard/:id',
				element: <Post />,
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
