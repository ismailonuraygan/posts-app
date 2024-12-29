'use server'

import { cookies } from 'next/headers'

export async function getAuthStatus() {
	const cookieStore = cookies()

	const accessToken = cookieStore.get('accessToken')

	return !!accessToken
}
