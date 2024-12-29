'use client'

import { useEffect, useState } from 'react'
import { getAuthStatus } from '@/actions/auth'

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			setIsLoading(true)

			try {
				const isAuth = await getAuthStatus()

				setIsAuthenticated(isAuth)
			} catch (error) {
				console.error('Error checking auth status:', error)

				setIsAuthenticated(false)
			} finally {
				setIsLoading(false)
			}
		}

		checkAuth()
	}, [])

	return { isAuthenticated, isLoading }
}
