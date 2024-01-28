import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../utils/app'
import { getAuth } from 'firebase/auth'

const Post = () => {
	const params = useParams()
	const id = params.id

	const [post, setPost] = useState()
	const [comments, setComments] = useState([])
	const user = getAuth().currentUser
	console.log(user)

	const getPosts = async () => {
		const postsCollectionRef = collection(db, 'Posts')
		const querySnapshot = await getDocs(postsCollectionRef)

		querySnapshot.forEach(async (doc) => {
			setPost(doc.data())

			const commentsCollectionRef = collection(doc.ref, 'comments')
			const commentsQuerySnapshot = await getDocs(commentsCollectionRef)

			const comments = []
			commentsQuerySnapshot.forEach((commentDoc) => {
				comments.push(commentDoc.data())
			})

			comments.sort((a, b) => b.timestamp - a.timestamp)
			console.log(comments)
			setComments(comments)
		})
	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		post && (
			<div className='min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] bg-content-bg p-6'>
				<div className='max-w-lg mx-auto'>
					<h1 className='mb-4 text-3xl font-bold md:text-4xl'>
						{post.title}
					</h1>
					<div className='h-[1px] bg-white opacity-10 mb-4'></div>
					<p className='mb-4 font-medium'>{post.desc}</p>
					<div className='h-[1px] bg-white opacity-10 mb-4'></div>
					<h3 className='flex justify-between text-xl font-semibold text-gray-300'>
						<span>Comments</span>
						<span>{comments.length}</span>
					</h3>
					<form className='my-4'>
						<textarea
							name='comment'
							id='comment'
							className='w-full bg-black resize-none textarea textarea-bordered bg-opacity-15'
							placeholder='Add a new comment'
						></textarea>
						<button className='px-4 py-2 mr-auto font-semibold duration-150 rounded-md bg-secondary hover:bg-opacity-90'>
							Post Comment
						</button>
					</form>
				</div>
			</div>
		)
	)
}

export default Post
