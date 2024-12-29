'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { toast } from 'react-toastify'

import { useRequest } from '@/app/api'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import { IPost } from '@/types/post'
import { useRouter } from 'next/navigation'

interface EditPostFormProps {
	post: IPost
	onCancel: () => void
	onSave: (updatedPost: IPost) => void
}

export default function EditPostForm({ post, onCancel, onSave }: EditPostFormProps) {
	const req = useRequest()
	const router = useRouter()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [formData, setFormData] = useState({
		title: post.title,
		body: post.body
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async () => {
		setLoading(true)

		setError(null)

		try {
			const { data } = await req.put(`/posts/${post.id}`, formData)

			onSave(data)

			toast.success('Post updated successfully!')

			router.push(`/posts/${post.id}`)
		} catch (error) {
			console.error('Error updating post:', error)

			toast.error('Failed to update post. Please try again.')

			setError('Failed to update post. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const handleCancel = () => {
		onCancel()
	}

	return (
		<Box
			component="form"
			onSubmit={(e) => e.preventDefault()}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3
			}}
		>
			<TextField
				name="title"
				label="Title"
				value={formData.title}
				onChange={handleChange}
				required
				fullWidth
			/>

			<TextField
				name="body"
				label="Content"
				value={formData.body}
				onChange={handleChange}
				required
				multiline
				rows={6}
				fullWidth
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
					variant="contained"
					onClick={handleCancel}
					sx={{
						bgcolor: 'var(--border-color)',
						'&:hover': {
							bgcolor: 'var(--border-color)',
						}
					}}
				>
					Cancel
				</Button>

				<Button
					variant="contained"
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? 'Saving...' : 'Save Changes'}
				</Button>
			</Box>
		</Box>
	)
}
