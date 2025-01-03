'use client'

import { PostsProvider, usePostsContext } from './context/PostsContext'
import PostsHeader from './components/PostsHeader'
import PostsList from './components/PostsList'

export default function PostPage () {
	return (
		<PostsProvider>
			<Posts />
		</PostsProvider>
	)
}

function Posts() {
	return (
		<div className='main'>
			<div className='container'>
				<PostsHeader />
			</div>

			<div className='container'>
				<PostsList />
			</div>
		</div>
	)
}
