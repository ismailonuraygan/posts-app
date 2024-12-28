'use client'

import { useState } from 'react'
import { Box, TextField, Button, CircularProgress } from '@mui/material'
import { useRequest } from '@/app/api'
import { toast } from 'react-toastify'

interface AddCommentProps {
	postId: number
	onCommentAdded: (newComment: any) => void
}

export default function AddComment({ postId, onCommentAdded }: AddCommentProps) {
	const [comment, setComment] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const req = useRequest()

	const handleSubmitComment = async () => {
		if (!comment.trim()) return

		setSubmitting(true)
		try {
			const response = await req.post(`/comments/add`, {
				body: comment,
				postId,
				userId: 1, // Using a default user ID for demo
			})

			onCommentAdded(response.data)
			setComment('')
			toast.success('Comment added successfully!')
		} catch (error) {
			console.error('Error submitting comment:', error)
			toast.error('Failed to add comment. Please try again.')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Box sx={{ mt: 4 }}>
			<TextField
				value={comment}
				label="Comment"
				placeholder="Write a comment..."
				onChange={(e) => setComment(e.target.value)}
				fullWidth
				multiline
				rows={4}
				sx={{
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: 'var(--border-color)'
						},
						'&:hover fieldset': {
							borderColor: 'var(--foreground)'
						},
						'&.Mui-focused fieldset': {
							borderColor: 'var(--foreground)'
						}
					},
					'& .MuiInputLabel-root': {
						color: 'var(--secondary-text)',
						'&.Mui-focused': {
							color: 'var(--foreground)'
						}
					},
					'& .MuiInputBase-input': {
						color: 'var(--foreground)'
					}
				}}
			/>

			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					variant="contained"
					onClick={handleSubmitComment}
					disabled={!comment.trim() || submitting}
					sx={{
						bgcolor: 'var(--foreground)',
						color: 'var(--background)',
						'&:hover': {
							bgcolor: 'var(--foreground)',
							opacity: 0.9
						},
						'&.Mui-disabled': {
							bgcolor: 'var(--border-color)',
							color: 'var(--secondary-text)'
						}
					}}
				>
					{ submitting ? <CircularProgress size={24} sx={{ color: 'var(--background)' }} /> : 'Submit' }
				</Button>
			</Box>
		</Box>
	)
}
