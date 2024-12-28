'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Pagination, FormControl, InputLabel, Select, MenuItem, Box, IconButton, TextField, InputAdornment, Menu } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import { debounce } from 'lodash'

import { useRequest } from '../api'
import styles from './posts.module.css'
import { useRouter } from 'next/navigation'
import { IPost } from '@/types/post'

export default function Posts() {
	const [posts, setPosts] = useState<IPost[]>([])
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [loading, setLoading] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	const req = useRequest()

	const fetchPosts = useCallback(async () => {
		try {
			const skip = (page - 1) * itemsPerPage

			const endpoint = searchQuery
				? `/posts/search?q=${searchQuery}&limit=${itemsPerPage}&skip=${skip}`
				: `/posts?limit=${itemsPerPage}&skip=${skip}`

			const data = await req.get(endpoint)

			setPosts(data.data.posts)

			setTotalPages(Math.ceil(data.data.total / itemsPerPage))
		} catch (error) {
			console.error('Error fetching posts:', error)
		}
	}, [page, itemsPerPage, searchQuery])

	const handleDelete = async (e: React.MouseEvent, postId: number) => {
		e.preventDefault()

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

	const debouncedSearch = debounce((query: string) => {
		setSearchQuery(query)

		setPage(1)
	}, 800)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value

		debouncedSearch(query)
	}

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}

	const handleItemsPerPageChange = (e: any) => {
		setItemsPerPage(Number(e.target.value))

		setPage(1)
	}

	useEffect(() => {
		fetchPosts()
	}, [fetchPosts])

	if (!posts.length) return <div>Loading...</div>

	return (
		<div className='main'>
			<div className='container'>
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 3
				}}>
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>
						<h1>Posts</h1>

						<FormControl size="small" sx={{
							minWidth: 120,
							'& .MuiSelect-select': {
								paddingRight: '32px !important'
							},
							'& .MuiSelect-icon': {
								right: '7px'
							},
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									paddingRight: 0
								}
							}
						}}>
							<InputLabel id="items-per-page-label">Posts per page</InputLabel>

							<Select
								labelId="items-per-page-label"
								value={itemsPerPage}
								label="Posts per page"
								onChange={handleItemsPerPageChange}
								MenuProps={{
									PaperProps: {
										sx: {
											'& .MuiList-root': {
												paddingRight: '0px'
											}
										}
									}
								}}
							>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={20}>20</MenuItem>
								<MenuItem value={50}>50</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<TextField
						placeholder="Search posts..."
						onChange={handleSearch}
						fullWidth
						size="small"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon sx={{ color: 'var(--secondary-text)' }} />
								</InputAdornment>
							),
						}}
						sx={{
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: 'var(--border-color)',
								},
								'&:hover fieldset': {
									borderColor: 'var(--primary-color)',
								},
								'&.Mui-focused fieldset': {
									borderColor: 'var(--primary-color)',
								},
							},
							'& .MuiInputBase-input': {
								color: 'var(--foreground)',
							},
						}}
					/>
				</Box>
			</div>

			<div className='container'>
				<ul className={styles.postsList}>
					{posts.map((post) => (
						<Link href={`/posts/${post.id}`} key={post.id} prefetch>
							<li>
								<span>{post.title}</span>

								<IconButton
									onClick={(e) => handleDelete(e, post.id)}
									disabled={loading}
									size="small"
									sx={{
										color: 'var(--foreground)',
										'&:hover': {
											color: '#ef4444',
											backgroundColor: 'rgba(239, 68, 68, 0.1)'
										}
									}}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</li>
						</Link>
					))}
				</ul>

				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color="primary"
					/>
				</Box>
			</div>
		</div>
	)
}
