'use client'

import { useEffect, useState } from 'react'
import { Alert, Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { useRequest } from '@/app/api'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import AlreadyLoggedIn from './components/AlreadyLoggedIn'

export default function Login() {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const router = useRouter()
	const req = useRequest()


	const handleLogout = () => {
		
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

	}

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={
					{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 3
					}
				}
			>
				<Typography
					component="h1"
					variant="h5"

				>
					Sign in
				</Typography>

				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'stretch', width: '100%' }}
				>
					{
						error && (
							<Alert severity="error" sx={{ mb: 2 }}>
								{ error }
							</Alert>
						)
					}

					<TextField
						name="username"
						label="Username"
						value={formData.username}
						onChange={handleChange}
						required
						fullWidth
					/>

					<TextField
						name="password"
						label="Password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						required
						fullWidth
					/>

					<Button
						type="submit"
						variant="contained"
						fullWidth
						disabled={loading}
					>
						{loading ? 'Signing in...' : 'Sign in'}
					</Button>
				</Box>
			</Box>
		</Container>
	)
}
