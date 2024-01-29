import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../utils/app'
import { getAuth } from 'firebase/auth'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import Divider from './Divider'
import { toast } from 'react-toastify'

const Dashboard = () => {
	const auth = getAuth()
	const navigate = useNavigate()

	const [userData, setUserData] = useState(null)
	const [posts, setPosts] = useState([])
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const handlePostButton = async (e) => {
		e.preventDefault()

		try {
			const postRef = collection(db, 'Posts')
			console.log({
				title: title,
				desc: description,
				poster: userData.username,
				pin: userData.pin,
			})

			const id = nanoid()

			await setDoc(doc(postRef, id), {
				title: title,
				desc: description,
				poster: userData.username,
				pin: userData.pin,
				timestamp: Date.now(),
				id: id,
			})

			setTitle('')
			setDescription('')
			getPosts()
		} catch (error) {
			toast.error(error.message)
		}
	}

	const getPosts = async () => {
		try {
			const docRef = collection(db, 'Posts')
			const docSnap = await getDocs(docRef)

			const user = auth.currentUser
			const userRef = doc(db, 'Users', user.uid)
			const userSnap = await getDoc(userRef)
			setUserData(userSnap.data())

			const posts = []

			docSnap.forEach((doc) => {
				posts.unshift(doc.data())
			})

			posts.sort((a, b) => b.timestamp - a.timestamp)

			setPosts(posts)
		} catch (error) {
			toast.error(error.message)
		}
	}

	const getTime = (epochTime) => {
		const date = new Date(epochTime)

		// Extract date, hour, and minute components
		const year = date.getFullYear()
		const month = ('0' + (date.getMonth() + 1)).slice(-2)
		const day = ('0' + date.getDate()).slice(-2)
		const hour = ('0' + date.getHours()).slice(-2)
		const minute = ('0' + date.getMinutes()).slice(-2)

		const formattedDateTime = `${hour}:${minute}, ${day}-${month}-${year}`

		return formattedDateTime
	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		<div className='min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] bg-content-bg p-6'>
			<form className='flex flex-col max-w-lg gap-2 mx-auto mb-4'>
				<h3 className='text-sm text-slate-400'>
					Welcome,{' '}
					<span className='font-medium text-primary'>
						{userData?.username}
					</span>
					. What is on your mind?
				</h3>
				<input
					type='text'
					name='title'
					id='title'
					className='text-lg bg-black bg-opacity-15 input'
					placeholder='Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					name='description'
					id='description'
					className='text-lg bg-black resize-none bg-opacity-15 textarea'
					placeholder='Description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<button
					className='w-16 px-4 py-2 font-semibold duration-150 rounded-md bg-secondary hover:bg-opacity-90'
					type='submit'
					onClick={handlePostButton}
				>
					Post
				</button>
			</form>
			<Divider />
			<div>
				{posts.map((post) => (
					<div
						key={post.id}
						className='max-w-lg px-4 py-2 mx-auto mb-2 duration-200 bg-black bg-opacity-25 rounded-lg cursor-pointer hover:bg-opacity-50'
						onClick={() => navigate(`/dashboard/${post.id}`)}
					>
						<h3 className='text-xl font-medium'>{post.title}</h3>
						<div className='flex items-center justify-between text-sm opacity-85'>
							<p>{post.poster}</p>
							<p className='text-xs'>{getTime(post.timestamp)}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Dashboard
