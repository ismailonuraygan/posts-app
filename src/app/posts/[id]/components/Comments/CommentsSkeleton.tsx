'use client'

import { Box, Typography, Skeleton } from '@mui/material'

export default function CommentsSkeleton() {
	return (
		<Box sx={{ mt: 4 }}>
			<Typography
				variant="h6"
				sx={{
					color: 'var(--foreground)',
					mb: 3
				}}
			>
				Comments
			</Typography>

			{[...Array(3)].map((_, index) => (
				<Box
					key={index}
					sx={{
						display: 'flex',
						gap: 2,
						mb: 3
					}}
				>
					<Skeleton
						variant="circular"
						width={32}
						height={32}
						sx={{ bgcolor: 'var(--border-color)' }}
					/>
					<Box sx={{ flex: 1 }}>
						<Skeleton
							variant="text"
							width={120}
							height={24}
							sx={{ bgcolor: 'var(--border-color)' }}
						/>
						<Skeleton
							variant="text"
							width="100%"
							height={20}
							sx={{ bgcolor: 'var(--border-color)' }}
						/>
					</Box>
				</Box>
			))}
		</Box>
	)
}
