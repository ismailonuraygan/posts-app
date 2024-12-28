'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Avatar, Typography } from '@mui/material'
import { useRequest } from '@/app/api'
import { IPost } from '@/types/post'
import { IUser } from '@/types/user'
import PostSkeleton from '../components/PostSkeleton'
import NotFound from '../components/NotFound'

export default function Post() {
	const req = useRequest()

	const [post, setPost] = useState<IPost | null>(null)
	const [user, setUser] = useState<IUser | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const { id } = useParams()

	const fetchUser = async (userId: number) => {
		try {
			const data = await req.get(`/users/${userId}`)

			setUser(data.data)
		} catch (error) {
			console.error('Error fetching user:', error)
			setError('Error loading user information')
		}
	}

	useEffect(() => {
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
			fetchPost()
	}, [id])
	
	if(!post) return

	return (
		<div className='main'>
			<div className='container'>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
					<Typography variant="h4" component="h1" sx={{ color: 'var(--foreground)' }}>
						{post.title}
					</Typography>

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
				</Box>
			</div>
		</div>
	)
}
