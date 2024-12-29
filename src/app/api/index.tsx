import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

let isRefreshing = false
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = []

const baseUrl = 'https://dummyjson.com/'

const processQueue = (error: AxiosError | null, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})

	failedQueue = []
}

export const useRequest = () => {
	const req = axios.create({
		baseURL: baseUrl,
		headers: {
			Accept: 'application/json',
		},
	})

	req.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const token = localStorage.getItem('accessToken')
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	req.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config
			console.log('originalRequest', originalRequest)
			// If error is not 401 or request already retried, reject
			if (error.response?.status !== 401 || originalRequest._retry) {
				return Promise.reject(error)
			}

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						return req(originalRequest)
					})
					.catch(err => {
						return Promise.reject(err)
					})
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				const refreshToken = localStorage.getItem('refreshToken')
				if (!refreshToken) {
					throw new Error('No refresh token')
				}

				const response = await axios.post(
					'https://dummyjson.com/auth/refresh',
					{},
					{
						headers: {
							Authorization: `Bearer ${refreshToken}`,
						},
					}
				)

				const { accessToken } = response.data
				localStorage.setItem('accessToken', accessToken)

				// Update cookies for middleware
				document.cookie = `accessToken=${accessToken}; path=/; max-age=${30 * 60}; SameSite=Lax`

				req.defaults.headers.common.Authorization = `Bearer ${accessToken}`
				originalRequest.headers.Authorization = `Bearer ${accessToken}`

				processQueue(null, accessToken)
				return req(originalRequest)
			} catch (err) {
				processQueue(err as AxiosError, null)

				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')

				document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
				document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

				window.location.href = '/login'

				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}
	)

	return req
}
