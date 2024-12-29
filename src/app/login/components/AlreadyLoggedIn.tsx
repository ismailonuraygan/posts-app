import { Alert, Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'

interface AlreadyLoggedInProps {
	handleLogout: () => void
}

export default function AlreadyLoggedIn({ handleLogout }: AlreadyLoggedInProps) {
	const router = useRouter()

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
					alignItems: 'center',
				}}
			>
				<Typography
					component="h1"
					variant="h5"
				>
					Already Logged In
				</Typography>

				<Alert severity="info" sx={{ width: '100%' }}>
					You are already logged in to your account.
				</Alert>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
					<Button
						variant="contained"
						onClick={() => router.push('/posts')}
						fullWidth
					>
						Go to Posts
					</Button>

					<Button
						variant="contained"
						onClick={handleLogout}
						fullWidth
						sx={{
							bgcolor: 'var(--border-color)',
							color: 'var(--foreground)',
							'&:hover': {
								bgcolor: 'var(--foreground)',
								color: 'var(--background)',
							}
						}}
					>
						Log Out
					</Button>
				</Box>
			</Box>
		</Container>
	)
}
