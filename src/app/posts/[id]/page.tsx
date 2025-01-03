'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Box, Avatar, Typography, Divider, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useRequest } from '@/app/api'
import { IPost } from '@/types/post'
import { IUser } from '@/types/user'
import PostSkeleton from '../components/PostSkeleton'
import CommentsSkeleton from './components/Comments/CommentsSkeleton'
import NotFound from './components/NotFound'
import Comments from './components/Comments/Comments'

export default function Post() {
	const req = useRequest()
	const router = useRouter()

	const [post, setPost] = useState<IPost | null>(null)
	const [user, setUser] = useState<IUser | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const { id } = useParams()

	const handleEditClick = () => {
		router.push(`/posts/${id}/edit`)
	}

	const fetchUser = async (userId: number) => {
		try {
			const data = await req.get(`/users/${userId}`)

			setUser(data.data)
		} catch (error) {
			console.error('Error fetching user:', error)
			setError('Error loading user information')
		}
	}

	const fetchPost = async () => {
		setLoading(true)
		setError(null)

		try {
			const data = await req.get(`/posts/${id}`)

			if (!data.data) {
				setError('Post not found')
				setLoading(false)
				return
			}

			setPost(data.data)
			await fetchUser(data.data.userId)
		} catch (error) {
			console.error('Error fetching post:', error)
			setError('Error loading post')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchPost()
	}, [id])

	if (loading) {
		return (
			<div className='main'>
				<div className='container'>
					<PostSkeleton />
					<CommentsSkeleton />
				</div>
			</div>
		)
	}

	if (error || !post) {
		return (
			<NotFound
				title={error === 'Post not found' ? 'Post Not Found' : 'Error'}
				message={
					error === 'Post not found'
						? 'The post you are looking for does not exist or has been removed.'
						: 'There was an error loading this post. Please try again later.'
				}
			/>
		)
	}

	return (
		<div className='main'>
			<div className='container'>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
					<Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
						<Typography variant="h4" component="h1" sx={{ color: 'var(--foreground)' }}>
							{post.title}
						</Typography>

						<IconButton
							onClick={handleEditClick}
							sx={{
								color: 'var(--secondary-text)',
								'&:hover': {
									color: 'var(--foreground)',
									bgcolor: 'transparent'
								}
							}}
						>
							<EditIcon />
						</IconButton>
					</Box>

					{user && (
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<Avatar
								src={user.image}
								alt={`${user.firstName} ${user.lastName}`}
								sx={{ width: 40, height: 40 }}
							/>

							<Box sx={{ display: 'flex', flexDirection: 'column' }}>
								<Typography sx={{ color: 'var(--foreground)' }}>
									{user.firstName} {user.lastName}
								</Typography>

								<Typography variant="body2" sx={{ color: 'var(--secondary-text)' }}>
									@{user.username}
								</Typography>
							</Box>
						</Box>
					)}

					<Typography sx={{ color: 'var(--foreground)', lineHeight: 1.7 }}>
						{post.body}
					</Typography>

					<Box sx={{
						display: 'flex',
						gap: 2,
						color: 'var(--secondary-text)',
						borderTop: '1px solid var(--border-color)',
						pt: 2,
						mt: 2
					}}>
						<Typography variant="body2">
							{post.reactions.likes} likes
						</Typography>

						<Typography variant="body2">
							{post.reactions.dislikes} dislikes
						</Typography>

						<Typography variant="body2">
							{post.views} views
						</Typography>
					</Box>

					<Divider sx={{ borderColor: 'var(--border-color)' }} />

					<Comments postId={post.id} />
				</Box>
			</div>
		</div>
	)
}
