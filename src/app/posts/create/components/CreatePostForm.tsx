'use client'

import { useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { useRequest } from '@/app/api'
import TextField from '@/components/TextField'
import Button from '@/components/Button'

export default function CreatePostForm() {
	const [formData, setFormData] = useState({
		title: '',
		body: '',
		tags: ''
	})
	const [submitting, setSubmitting] = useState(false)

	const req = useRequest()

	const router = useRouter()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!formData.title.trim() || !formData.body.trim()) {
			toast.error('Title and content are required')

			return
		}

		setSubmitting(true)

		try {
			const tagsArray = formData.tags
				.split(',')
				.map(tag => tag.trim())
				.filter(tag => tag !== '')

			const response = await req.post('/posts/add', {
				title: formData.title,
				body: formData.body,
				userId: 1,
				tags: tagsArray
			})

			toast.success('Post created successfully!')

			router.push('/posts')
		} catch (error) {
			console.error('Error creating post:', error)

			toast.error('Failed to create post. Please try again.')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				maxWidth: 800,
				mx: 'auto',
				mt: 4
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

			<TextField
				name="tags"
				label="Tags"
				value={formData.tags}
				onChange={handleChange}
				placeholder="Enter tags separated by commas"
				fullWidth
			/>

			<Button
				type="submit"
				variant="contained"
				disabled={submitting}
			>
				{submitting ? <CircularProgress size={24} sx={{ color: 'var(--background)' }} /> : 'Create Post'}
			</Button>
		</Box>
	)
}
