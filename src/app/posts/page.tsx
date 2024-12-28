'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Pagination, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'

import { useRequest } from '../api'
import styles from './posts.module.css'
import { useRouter } from 'next/navigation'
import { IPost } from '@/types/post'

export default function Posts() {
	const [posts, setPosts] = useState<IPost[]>([])
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)

	const req = useRequest()
	const router = useRouter()

	const fetchPosts = async () => {
		try {
			const skip = (page - 1) * itemsPerPage

			const data = await req.get(`/posts?limit=${itemsPerPage}&skip=${skip}`)

			setPosts(data.data.posts)
			
			setTotalPages(Math.ceil(data.data.total / itemsPerPage))
		} catch (error) {
			console.error('Error fetching posts:', error)
		}
	}

	useEffect(() => {
		fetchPosts()
		// Reset to first page when items per page changes
		setPage(1)
	}, [itemsPerPage])

	useEffect(() => {
		fetchPosts()
	}, [page])

	if (!posts.length) return <div>Loading...</div>

	return (
		<div className='main'>
			<div className='container'>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<h1>Posts</h1>

					<FormControl size="small" sx={{ minWidth: 120 }}>
						<InputLabel id="items-per-page-label">Posts per page</InputLabel>

						<Select
							labelId="items-per-page-label"
							value={itemsPerPage}
							label="Posts per page"
							onChange={(e) => setItemsPerPage(Number(e.target.value))}
						>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={50}>50</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</div>

			<div className='container'>
				<ul className={styles.postsList}>
					{
						posts.map((post) => (
							<Link href={`/posts/${post.id}`} key={post.id} prefetch>
								<li key={post.id}>
									{post.title}
								</li>
							</Link>
					))
					}
				</ul>
			</div>

			<Pagination
				count={totalPages}
				page={page}
				onChange={(event, value) => setPage(value)}
				color="primary"
				sx={{
					marginTop: 2,
					display: 'flex',
					justifyContent: 'center',
					'& .MuiPaginationItem-root': {
						'&:hover': {
							backgroundColor: 'rgba(0, 112, 243, 0.1)',
						},
					},
					'& .Mui-selected': {
						backgroundColor: '#0070f3 !important',
						color: '#fff !important',
						'&:hover': {
							backgroundColor: '#0060df !important',
						},
					},
				}}
			/>
		</div>
	)
}
