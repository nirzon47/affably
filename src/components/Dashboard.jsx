import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../utils/app'
import { getAuth } from 'firebase/auth'

const Dashboard = () => {
	const [posts, setPosts] = useState([])
	const auth = getAuth()

	const getPosts = async () => {
		const docRef = collection(db, 'Posts')
		const docSnap = await getDocs(docRef)

		const user = auth.currentUser
		const userRef = doc(db, 'Users', user.uid)
		const userSnap = await getDoc(userRef)
		console.log(userSnap.data())

		const posts = []

		docSnap.forEach((doc) => {
			posts.push(doc.data())
		})

		setPosts(posts)
	}

	const getTime = (epochTime) => {
		const date = new Date(epochTime * 1000)

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
			<div className='flex flex-col max-w-xl gap-2 mx-auto mb-8'>
				<input
					type='text'
					name='title'
					id='title'
					className='text-lg bg-black bg-opacity-15 input input-bordered'
					placeholder='Title'
				/>
				<textarea
					name='description'
					id='description'
					className='text-lg bg-black resize-none bg-opacity-15 textarea textarea-bordered'
					placeholder='Description'
				></textarea>
			</div>
			<div className='flex flex-col gap-2'>
				{posts.map((post) => (
					<div
						key={post.id}
						className='px-4 py-2 duration-200 bg-black bg-opacity-25 rounded-lg cursor-pointer hover:bg-opacity-50'
					>
						<h3 className='text-xl font-medium'>{post.title}</h3>
						<div className='flex items-center justify-between text-sm opacity-85'>
							<p>{post.poster}</p>
							<p className='text-xs'>
								{getTime(post.timestamp.seconds)}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Dashboard
