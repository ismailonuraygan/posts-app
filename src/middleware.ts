import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of protected routes
const protectedRoutes = [
				'/posts/create',
				'/posts/:id/edit',
				'/posts/:id/comments/create'
]

async function refreshAccessToken(refreshToken: string) {
				try {
								const response = await fetch('https://dummyjson.com/auth/refresh', {
												method: 'POST',
												headers: {
																'Content-Type': 'application/json',
																'Authorization': `Bearer ${refreshToken}`
												},
												body: JSON.stringify({
														expiresInMins: 30,
														refreshToken
												})
								})

								if (!response.ok) throw new Error('Failed to refresh token')

								const data = await response.json()

								return data.accessToken
				} catch (error) {
								console.error('Error refreshing token:', error)
								return null
				}
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname === '/unauthorized' || pathname === '/login') {
					return NextResponse.next()
	}

	const isProtectedRoute = protectedRoutes.some(route => {
					const pattern = route.replace(':id', '[^/]+')
					return new RegExp(`^${pattern}$`).test(pathname)
	})

	if (isProtectedRoute) {
		const accessToken = request.cookies.get('accessToken')?.value
		const refreshToken = request.cookies.get('refreshToken')?.value

		if (!accessToken && !refreshToken) {
			// No tokens available, redirect to login
			const loginUrl = new URL('/login', request.url)
			loginUrl.searchParams.set('callbackUrl', pathname)
			return NextResponse.redirect(loginUrl)
		}

		if (!accessToken && refreshToken) {
			// Try to refresh the access token
			const newAccessToken = await refreshAccessToken(refreshToken)

			if (newAccessToken) {
				const response = NextResponse.next()

				response.cookies.set({
					name: 'accessToken',
					value: newAccessToken,
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
					maxAge: 30 * 60 // 30 minutes
				})

				return response
			} else {
				const loginUrl = new URL('/login', request.url)

				loginUrl.searchParams.set('callbackUrl', pathname)

				return NextResponse.redirect(loginUrl)
			}
		}

		return NextResponse.next()
	}

	return NextResponse.next()
}

// Configure the paths that middleware will run on
export const config = {
	matcher: [
		'/posts/create',
		'/posts/:path*/edit',
		'/posts/:path*/comments/create',
		'/unauthorized',
		'/login'
	]
}

