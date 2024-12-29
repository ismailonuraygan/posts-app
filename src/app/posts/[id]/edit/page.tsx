'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Box, Container } from '@mui/material'
import { useRequest } from '@/app/api'
import { IPost } from '@/types/post'
import EditPostForm from '../../components/EditPostForm'
import NotFound from '../components/NotFound'
import PostSkeleton from '../../components/PostSkeleton'

export default function EditPost() {
	const router = useRouter()
	const { id } = useParams()
	const req = useRequest()

	const [post, setPost] = useState<IPost | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await req.get(`/posts/${id}`)
				setPost(response.data)
			} catch (error) {
				console.error('Error fetching post:', error)
				setError('Failed to load post')
			} finally {
				setLoading(false)
			}
		}

		fetchPost()
	}, [id])

	const handleCancel = () => {
		router.back()
	}

	const handleSave = async (updatedPost: IPost) => {
		try {
			await req.put(`/posts/${id}`, updatedPost)
			router.push(`/posts/${id}`)
		} catch (error) {
			console.error('Error updating post:', error)
			// Handle error appropriately
		}
	}

	if (loading) {
		return (
			<div className='main'>
				<Container maxWidth="md">
					<PostSkeleton />
				</Container>
			</div>
		)
	}

	if (error || !post) {
		return (
			<NotFound
				title="Post Not Found"
				message="The post you are trying to edit does not exist or has been removed."
			/>
		)
	}

	return (
		<div className='main'>
			<Container maxWidth="md">
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
					<EditPostForm
						post={post}
						onCancel={handleCancel}
						onSave={handleSave}
					/>
				</Box>
			</Container>
		</div>
	)
}
