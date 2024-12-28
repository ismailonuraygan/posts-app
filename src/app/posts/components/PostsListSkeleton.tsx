'use client'

import { Box, Skeleton } from '@mui/material'
import styles from '../posts.module.css'
import { usePostsContext } from '../context/PostsContext'

export default function PostsListSkeleton() {
	const {itemsPerPage} = usePostsContext()
	return (
		<>
			<ul className={styles.postsList}>
				{[...Array(itemsPerPage)].map((_, index) => (
					<li key={index} style={{ padding: '12px 16px' }}>
						<Skeleton
							variant="text"
							width="80%"
							height={24}
							sx={{
								bgcolor: 'var(--border-color)'
							}}
						/>
						<Skeleton
							variant="circular"
							width={30}
							height={30}
							sx={{
								bgcolor: 'var(--border-color)'
							}}
						/>
					</li>
				))}
			</ul>

			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
				<Skeleton
					variant="rectangular"
					width={300}
					height={32}
					sx={{
						bgcolor: 'var(--border-color)',
						borderRadius: 1
					}}
				/>
			</Box>
		</>
	)
}
