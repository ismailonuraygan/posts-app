'use client'

import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { useRequest } from '@/app/api'
import { IPost } from '@/types/post'

interface EditPostFormProps {
	post: IPost
	onCancel: () => void
	onSave: (updatedPost: IPost) => void
	onUpdate: () => Promise<void>
}

export default function EditPostForm({ post, onCancel, onSave, onUpdate }: EditPostFormProps) {
	const req = useRequest()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [formData, setFormData] = useState({
		title: post.title,
		body: post.body
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setLoading(true)

		setError(null)

		try {
			const { data } = await req.put(`/posts/${post.id}`, formData)

			onSave(data)

			await onUpdate()
		} catch (error) {
			console.error('Error updating post:', error)
			setError('Failed to update post. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3
			}}
		>
			<TextField
				label="Title"
				value={formData.title}
				onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
				required
				fullWidth
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

			<TextField
				label="Content"
				value={formData.body}
				onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
				required
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

			{error && (
				<Box
					sx={{
						color: '#ef5350',
						fontSize: '0.875rem'
					}}
				>
					{error}
				</Box>
			)}

			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
				<Button
					type="button"
					onClick={onCancel}
					disabled={loading}
					sx={{
						borderColor: 'var(--border-color)',
						color: 'var(--foreground)',
						'&:hover': {
							borderColor: 'var(--foreground)',
							bgcolor: 'transparent'
						}
					}}
				>
					Cancel
				</Button>

				<Button
					type="submit"
					variant="contained"
					disabled={loading}
					sx={{
						bgcolor: 'var(--foreground)',
						color: 'var(--background)',
						'&:hover': {
							bgcolor: 'var(--foreground)',
							opacity: 0.9
						}
					}}
				>
					{loading ? 'Saving...' : 'Save Changes'}
				</Button>
			</Box>
		</Box>
	)
}
