import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../utils/app'
import { getAuth } from 'firebase/auth'
import Divider from './Divider'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'

const Post = () => {
	const params = useParams() // Get params object using react-router
	const id = params.id // Get id from params object

	const [post, setPost] = useState() // Contains the post
	const [comments, setComments] = useState([]) // Contains all the comments
	const [textarea, setTextarea] = useState('') // Input textarea state
	const [loading, setLoading] = useState(false) // Flag to show loader

	// Gets current user's UID
	const userId = getAuth().currentUser.uid

	/**
	 * Asynchronously retrieves posts and sets the post data, then retrieves comments or handles errors.
	 */
	const getPosts = async () => {
		try {
			const postRef = doc(db, 'Posts', id) // Refers to the id of the post in 'Posts' collection
			const querySnapshot = await getDoc(postRef) // Gets the post

			setPost(querySnapshot.data()) // Sets the post

			getComments() // Gets the comments
		} catch (error) {
			toast.error(error.message)
		}
	}

	/**
	 * Retrieves comments from the database and sets the state accordingly.
	 *
	 * @param None
	 * @return {Promise<void>}
	 */
	const getComments = async () => {
		setLoading(true) // Sets the loading state

		try {
			// Refers to the comments collection of the id of the 'Posts' collection
			const commentsCollectionRef = collection(db, 'Posts', id, 'comments')
			const commentsQuerySnapshot = await getDocs(commentsCollectionRef) // Gets all the comments

			const comments = [] // Contains all the comments

			// Iterates over the comments and adds them to the 'comments' array
			commentsQuerySnapshot.forEach((commentDoc) => {
				comments.push(commentDoc.data())
			})

			// Sorts the comments by timestamp
			comments.sort((a, b) => a.timestamp - b.timestamp)
			setComments(comments) // Sets the comments
		} catch (error) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	/**
	 * Asynchronously handles adding a comment.
	 *
	 * @param {Event} e - The event object
	 * @return {Promise} A promise representing the result of the function
	 */
	const handleAddComment = async (e) => {
		e.preventDefault()

		// Refers to the comments collection of the id of the 'Posts' collection
		const commentRef = collection(db, 'Posts', id, 'comments')

		try {
			let user // Contains the current user

			// Gets the current user data
			await getDoc(doc(db, 'Users', userId)).then((userDoc) => {
				user = userDoc.data()
			})

			const randomID = nanoid() // Generates a random ID

			// Adds a new comment to the 'comments' collection inside the 'Posts' collection
			await setDoc(doc(commentRef, randomID), {
				comment: textarea,
				poster: user.username,
				pin: user.pin,
				timestamp: Date.now(),
				id: randomID,
			})

			setTextarea('') // Resets the textarea
			getComments() // Gets the comments
			toast.success('Comment added')
		} catch (error) {
			toast.error(error.message)
		}
	}

	/**
	 * Returns a formatted date and time string based on the given epoch time.
	 *
	 * @param {number} epochTime - The epoch time to convert to a formatted date and time.
	 * @return {string} The formatted date and time string.
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

	// Gets the post and comments when the component mounts
	useEffect(() => {
		getPosts()
		getComments()
	}, [])

	return (
		<div className='min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] bg-content-bg p-6'>
			{loading && (
				<div className='grid place-content-center'>
					<span className='loading loading-dots loading-lg'></span>
				</div>
			)}
			{!loading && post && (
				<div className='max-w-lg mx-auto'>
					<h1 className='mb-4 text-3xl font-bold md:text-4xl'>
						{post.title}
					</h1>
					<Divider />
					<p className='mb-4 font-medium'>{post.desc}</p>
					<Divider />
					<h3 className='flex justify-between text-xl font-semibold text-gray-300'>
						<span>Comments</span>
						<span>{comments.length}</span>
					</h3>
					<form className='grid gap-2 my-4'>
						<textarea
							name='comment'
							id='comment'
							className='w-full bg-black resize-none textarea bg-opacity-15'
							placeholder='Add a new comment'
							value={textarea}
							onChange={(e) => setTextarea(e.target.value)}
						></textarea>
						<button
							type='submit'
							onClick={handleAddComment}
							className='px-4 py-2 mr-auto font-semibold duration-150 rounded-md bg-secondary hover:bg-opacity-90'
						>
							Post Comment
						</button>
					</form>
					<div className='mt-12'>
						{comments.map((comment) => (
							<div key={comment.id} className='max-w-lg mx-auto mb-4'>
								<div className='flex items-center justify-between text-xs opacity-85 mb-0.5'>
									<p className='bg-black rounded-full bg-opacity-25 px-2 py-0.5'>
										{comment.poster}
									</p>
									<p className='text-gray-400'>
										{getTime(comment.timestamp)}
									</p>
								</div>
								<h3 className='pl-2 text-sm font-medium md:text-base'>
									{comment.comment}
								</h3>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Post
