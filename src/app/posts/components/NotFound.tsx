'use client'

import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface NotFoundProps {
	title?: string
	message?: string
	showBackButton?: boolean
}

export default function NotFound({ title = 'Not Found', message = 'The page you are looking for does not exist.', showBackButton = true}: NotFoundProps) {
	const router = useRouter()

	return (
		<div className='main'>
			<div className='container'>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 2,
						minHeight: '50vh',
						textAlign: 'center'
					}}
				>
					<ErrorOutlineIcon
						sx={{
							fontSize: 64,
							color: 'var(--secondary-text)'
						}}
					/>

					<Typography
						variant="h4"
						component="h1"
						sx={{
							color: 'var(--foreground)',
							fontWeight: 500
						}}
					>
						{title}
					</Typography>

					<Typography
						sx={{
							color: 'var(--secondary-text)',
							maxWidth: 400
						}}
					>
						{message}
					</Typography>

					{showBackButton && (
						<Button
							variant="outlined"
							onClick={() => router.back()}
							sx={{
								mt: 2,
								borderColor: 'var(--border-color)',
								color: 'var(--foreground)',
								'&:hover': {
									borderColor: 'var(--foreground)',
									bgcolor: 'transparent'
								}
							}}
						>
							Go Back
						</Button>
					)}
				</Box>
			</div>
		</div>
	)
}
