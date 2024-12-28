'use client'

import Link from 'next/link'
import { Box, IconButton, Pagination } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { usePostsContext } from '../context/PostsContext'
import styles from '../posts.module.css'
import PostsListSkeleton from './PostsListSkeleton'

export default function PostsList() {
	const {
		posts,
		page,
		totalPages,
		loading,
		setPage,
		deletePost
	} = usePostsContext()

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}

	const handleDelete = async (e: React.MouseEvent, postId: number) => {
		e.preventDefault()
		await deletePost(postId)
	}

	if (loading) {
		return <PostsListSkeleton />
	}

	if (!posts.length) {
		return (
			<Box sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: 200,
				color: 'var(--secondary-text)'
			}}>
				No posts found
			</Box>
		)
	}

	return (
		<>
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
		</>
	)
}
