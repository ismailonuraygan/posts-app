'use client'

import { Box, Typography } from '@mui/material'
import CreatePostForm from './components/CreatePostForm'

export default function CreatePost() {
	return (
		<div className='main'>
			<div className='container'>
				<Box sx={{ mt: 4 }}>
					<Typography
						variant="h1"
						sx={{
							color: 'var(--foreground)',
							mb: 4,
							fontSize: '2.125rem'
						}}
					>
						Create New Post
					</Typography>

					<CreatePostForm />
				</Box>
			</div>
		</div>
	)
}
