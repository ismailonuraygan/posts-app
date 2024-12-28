import axios from 'axios'

const baseUrl = 'https://dummyjson.com/'

export const useRequest = () => {
	const req = axios.create({
		baseURL: baseUrl,
		headers: {
			Accept: 'application/json',
		},
	})

	return req
}
