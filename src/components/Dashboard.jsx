import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../utils/app'
import { getAuth } from 'firebase/auth'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import Divider from './Divider'
import { toast } from 'react-toastify'

const Dashboard = () => {
	const auth = getAuth() // Firebase auth
	const navigate = useNavigate() // Router hook to navigate

	const [userData, setUserData] = useState(null) // Contains the user data after getting it from firebase
	const [posts, setPosts] = useState([]) // Contains all the posts
	const [filteredPosts, setFilteredPosts] = useState([]) // Uses some filter to show filtered posts
	const [title, setTitle] = useState('') // Input title state
	const [description, setDescription] = useState('') // Input description state
	const [showAll, setShowAll] = useState(false) // Flag to show all posts
	const [latest, setLatest] = useState(true) // Flag to see latest posts
	const [loading, setLoading] = useState(false) // Flag to show loader

	/**
	 * Asynchronously handles the post button click event, preventing default behavior,
	 * and attempts to add a new post to the database. If successful, it also resets the
	 * title and description input fields and retrieves the updated list of posts.
	 *
	 * @param {event} e - the click event object
	 * @return {Promise} a promise that resolves when the post is added to the database
	 */
	const handlePostButton = async (e) => {
		e.preventDefault()

		try {
			const postRef = collection(db, 'Posts') // Refers to the 'Posts' collection

			// Generates a unique ID
			const id = nanoid()

			// Adds a new post to the 'Posts' collection
			await setDoc(doc(postRef, id), {
				title: title,
				desc: description,
				poster: userData.username,
				pin: userData.pin,
				timestamp: Date.now(),
				id: id,
			})

			// Resets the title and description input fields
			setTitle('')
			setDescription('')
			getPosts()
		} catch (error) {
			toast.error(error.message)
		}
	}

	/**
	 * Asynchronously retrieves posts from the database, sorts and filters them, and updates state accordingly.
	 *
	 * @param {} - no parameters
	 * @return {Promise<void>} - a Promise that resolves when the function completes
	 */
	const getPosts = async () => {
		setLoading(true)

		try {
			const docRef = collection(db, 'Posts') // Refers to the 'Posts' collection
			const docSnap = await getDocs(docRef) // Gets all the data in the reference

			const user = auth.currentUser // Gets the current user
			const userRef = doc(db, 'Users', user.uid) // Refers to the current user in the 'Users' collection
			const userSnap = await getDoc(userRef) // Gets all the data in the reference
			setUserData(userSnap.data())

			const posts = [] // An array to store all the posts

			// Iterating over the 'Posts' collection and pushing the data to the 'posts' array
			docSnap.forEach((doc) => {
				posts.unshift(doc.data())
			})

			// Sorting the posts by timestamp
			posts.sort((a, b) => b.timestamp - a.timestamp)
			setPosts(posts) // Setting the 'posts' state

			//  Filtering the posts based on the user's pin
			const filteredPosts = posts.filter(
				(post) => post.pin === userSnap.data().pin
			)
			setFilteredPosts(filteredPosts) // Setting the 'filteredPosts' state
		} catch (error) {
			console.error(error)
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	/**
	 * Toggles the showAll state and updates the filteredPosts state accordingly.
	 *
	 * @return {void}
	 */
	const handleShowAll = () => {
		setShowAll(!showAll)

		// We are checking for true here because the setter works asynchronously
		if (showAll) {
			const filteredPosts = posts.filter((post) => post.pin === userData.pin)
			setFilteredPosts(filteredPosts)
		} else {
			setFilteredPosts(posts)
		}
	}

	/**
	 * Updates the order of filtered posts based on the latest flag.
	 */
	const handleOrder = () => {
		setLatest(!latest)

		// We are checking for true here because the setter works asynchronously
		if (latest) {
			const sortedPosts = filteredPosts.sort(
				(a, b) => a.timestamp - b.timestamp
			)
			setFilteredPosts(sortedPosts)
		} else {
			const sortedPosts = filteredPosts.sort(
				(a, b) => b.timestamp - a.timestamp
			)
			setFilteredPosts(sortedPosts)
		}
	}

	/**
	 * Returns a formatted date and time string from the given epoch time.
	 *
	 * @param {number} epochTime - The epoch time to convert to a formatted date and time string
	 * @return {string} The formatted date and time string
	 */
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

	// Gets posts when the component mounts
	useEffect(() => {
		getPosts()
	}, [])

	return (
		<div className='min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] bg-content-bg p-6'>
			<form className='flex flex-col max-w-lg gap-2 mx-auto mb-4'>
				<h3 className='text-sm text-slate-400'>
					{!loading && userData ? (
						<>
							Welcome,{' '}
							<span className='font-medium text-primary'>
								{userData?.username}
							</span>
							. What is on your mind?
						</>
					) : (
						'Hello!'
					)}
				</h3>
				<input
					type='text'
					name='title'
					id='title'
					className='text-base bg-black md:text-lg bg-opacity-15 input'
					placeholder='Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					name='description'
					id='description'
					className='text-base bg-black resize-none md:text-lg bg-opacity-15 textarea'
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
			<div className='flex items-center justify-between max-w-lg mx-auto mb-4'>
				<p
					className='w-1/2 text-sm text-blue-300 cursor-pointer md:w-auto tooltip'
					onClick={handleShowAll}
					data-tip={
						!showAll
							? 'Click to show all Posts'
							: 'Click to show only posts for your PIN'
					}
				>
					{showAll
						? 'Showing all posts'
						: 'Showing posts relevant to your PIN'}
				</p>
				<p
					className='w-1/2 text-sm text-blue-300 cursor-pointer md:w-auto tooltip'
					data-tip={latest ? 'Click to see oldest' : 'Click to see latest'}
					onClick={handleOrder}
				>
					{latest ? 'Sorting by latest' : 'Sorting by oldest'}
				</p>
			</div>
			{loading && (
				<div className='grid place-content-center'>
					<span className='loading loading-dots loading-lg'></span>
				</div>
			)}
			<div>
				{!loading &&
					filteredPosts.map((post) => (
						<div
							key={post.id}
							className='max-w-lg px-4 py-2 mx-auto mb-2 duration-200 bg-black bg-opacity-25 rounded-lg cursor-pointer hover:bg-opacity-50'
							onClick={() => navigate(`/dashboard/${post.id}`)}
						>
							<h3 className='text-lg font-medium md:text-xl'>
								{post.title}
							</h3>
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
