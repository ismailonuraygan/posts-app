'use client'

import { useEffect, useState } from 'react'
import { Alert, Box, Container, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

import { useRequest } from '@/app/api'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import AlreadyLoggedIn from './components/AlreadyLoggedIn'

export default function Login() {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const router = useRouter()
	const searchParams = useSearchParams()
	const req = useRequest()

	const callbackUrl = searchParams.get('callbackUrl') || '/posts'

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			setIsLoggedIn(true)
		}
	}, [])

	const handleLogout = () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')

		document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
		document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'

		setIsLoggedIn(false)

		router.refresh()
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setError('')
		setLoading(true)

		try {
			const data = await req.post('/auth/login', {
				username: formData.username,
				password: formData.password,
				expiresInMins: 30
			})

			if (data.data.accessToken) {
				localStorage.setItem('accessToken', data.data.accessToken)
				localStorage.setItem('refreshToken', data.data.refreshToken)

				document.cookie = `accessToken=${data.data.accessToken}; path=/; max-age=${30 * 60}; SameSite=Lax`
				document.cookie = `refreshToken=${data.data.refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`

				router.push(callbackUrl)
			}
		} catch (error) {
			console.error('Error logging in:', error)
			setError('Invalid username or password')
		} finally {
			setLoading(false)
		}
	}

	if (isLoggedIn) {
		return (
			<AlreadyLoggedIn handleLogout={handleLogout} />
		)
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
