'use client'

import { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Divider } from '@mui/material'
import { useRequest } from '@/app/api'
import { IComment } from '@/types/comment'
import CommentsSkeleton from './CommentsSkeleton'
import AddComment from './AddComment'

interface CommentsProps {
	postId: number
}

export default function Comments({ postId }: CommentsProps) {
	const req = useRequest()
	const [comments, setComments] = useState<IComment[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const handleCommentAdded = (newComment: IComment) => {
		setComments([...comments, newComment])
	}

	useEffect(() => {
		const fetchComments = async () => {
			setLoading(true)
			setError(null)

			try {
				const data = await req.get(`/posts/${postId}/comments`)

				setComments(data.data.comments || [])
			} catch (error) {
				console.error('Error fetching comments:', error)

				setError('Error loading comments')
			} finally {
				setLoading(false)
			}
		}

		fetchComments()
	}, [postId])

	if (loading) {
		return <CommentsSkeleton />
	}

	if (error) {
		return (
			<Box
				sx={{
					mt: 4,
					p: 2,
					borderRadius: 1,
					bgcolor: 'var(--border-color)',
					color: 'var(--secondary-text)'
				}}
			>
				{error}
			</Box>
		)
	}

	if (comments.length === 0) {
		return (
			<Box
				sx={{
					mt: 4,
					p: 2,
					borderRadius: 1,
					bgcolor: 'var(--border-color)',
					color: 'var(--secondary-text)'
				}}
			>
				No comments yet
			</Box>
		)
	}

	return (
		<Box sx={{ mt: 4 }}>
			<Typography
				variant="h6"
				sx={{
					color: 'var(--foreground)',
					mb: 3
				}}
			>
				Comments ({comments.length})
			</Typography>

			{comments.map((comment, index) => (
				<Box key={comment.id}>
					<Box
						sx={{
							display: 'flex',
							gap: 2,
							mb: 2
						}}
					>
						<Avatar
							sx={{
								width: 32,
								height: 32,
								bgcolor: 'var(--border-color)',
								color: 'var(--foreground)',
								fontSize: '0.875rem'
							}}
						>
							{comment.user.username[0].toUpperCase()}
						</Avatar>

						<Box>
							<Typography
								sx={{
									color: 'var(--foreground)',
									fontWeight: 500,
									fontSize: '0.875rem'
								}}
							>
								@{comment.user.username}
							</Typography>

							<Typography
								sx={{
									color: 'var(--foreground)',
									fontSize: '0.875rem',
									mt: 0.5,
									lineHeight: 1.5
								}}
							>
								{comment.body}
							</Typography>
						</Box>
					</Box>

					{index < comments.length - 1 && (
						<Divider
							sx={{
								borderColor: 'var(--border-color)',
								my: 2
							}}
						/>
					)}
				</Box>
			))}

			<AddComment postId={postId} onCommentAdded={handleCommentAdded} />
		</Box>
	)
}
