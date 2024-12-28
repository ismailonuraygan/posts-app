'use client'

import { Box, Skeleton } from '@mui/material'

export default function PostSkeleton() {
	return (
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
				<Skeleton
					variant="text"
					width="60%"
					height={40}
					sx={{ bgcolor: 'var(--border-color)' }}
				/>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<Skeleton
						variant="circular"
						width={40}
						height={40}
						sx={{ bgcolor: 'var(--border-color)' }}
					/>

					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Skeleton
							variant="text"
							width={120}
							height={24}
							sx={{ bgcolor: 'var(--border-color)' }}
						/>
						<Skeleton
							variant="text"
							width={80}
							height={20}
							sx={{ bgcolor: 'var(--border-color)' }}
						/>
					</Box>
				</Box>

				<Skeleton
					variant="rectangular"
					height={200}
					sx={{
						bgcolor: 'var(--border-color)',
						borderRadius: 1
					}}
				/>

				<Box sx={{
					display: 'flex',
					gap: 2,
					borderTop: '1px solid var(--border-color)',
					pt: 2,
					mt: 2
				}}>
					{[...Array(3)].map((_, index) => (
						<Skeleton
							key={index}
							variant="text"
							width={60}
							height={20}
							sx={{ bgcolor: 'var(--border-color)' }}
						/>
					))}
				</Box>
			</Box>
	)
}
