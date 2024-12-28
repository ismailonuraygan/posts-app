'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { IPost } from '@/types/post'
import { useRequest } from '../../api'

interface PostsContextType {
	posts: IPost[]
	page: number
	totalPages: number
	itemsPerPage: number
	loading: boolean
	searchQuery: string
	sortField: string
	sortOrder: 'asc' | 'desc'
	setPage: (page: number) => void
	setItemsPerPage: (itemsPerPage: number) => void
	setSearchQuery: (query: string) => void
	setSortField: (field: string) => void
	setSortOrder: (order: 'asc' | 'desc') => void
	fetchPosts: () => Promise<void>
	deletePost: (postId: number) => Promise<void>
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export function PostsProvider({ children }: { children: ReactNode }) {
	const [posts, setPosts] = useState<IPost[]>([])
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [loading, setLoading] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [sortField, setSortField] = useState('id')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

	const req = useRequest()

	const fetchPosts = useCallback(async () => {
		setLoading(true)

		try {
			const skip = (page - 1) * itemsPerPage

			let endpoint = searchQuery
				? `/posts/search?q=${searchQuery}&limit=${itemsPerPage}&skip=${skip}`
				: `/posts?limit=${itemsPerPage}&skip=${skip}`

			endpoint += `&select=id,title,reactions,tags&sortBy=${sortField}&order=${sortOrder}`

			const data = await req.get(endpoint)

			setPosts(data.data.posts)

			setTotalPages(Math.ceil(data.data.total / itemsPerPage))
		} catch (error) {
			console.error('Error fetching posts:', error)
		} finally {
			setLoading(false)
		}
	}, [page, itemsPerPage, searchQuery, sortField, sortOrder])

	const deletePost = async (postId: number) => {
		setLoading(true)

		try {
			await req.delete(`/posts/${postId}`)

			await fetchPosts()
		} catch (error) {
			console.error('Error deleting post:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchPosts()
	}, [page, itemsPerPage, searchQuery, sortField, sortOrder])

	const value = {
		posts,
		page,
		totalPages,
		itemsPerPage,
		loading,
		searchQuery,
		sortField,
		sortOrder,
		setPage,
		setItemsPerPage,
		setSearchQuery,
		setSortField,
		setSortOrder,
		fetchPosts,
		deletePost,
	}

	return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export function usePostsContext() {
	const context = useContext(PostsContext)

	if (context === undefined) {
		throw new Error('usePostsContext must be used within a PostsProvider')
	}
	return context
}
