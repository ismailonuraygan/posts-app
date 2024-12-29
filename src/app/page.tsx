'use client'

import Link from 'next/link'
import { Button } from '@mui/material'
import styles from './page.module.css'
import { PageHeader } from './components/PageHeader'
import FeatureCard from './components/FeatureCard'

export default function Home() {
	return (
		<div className='main'>
			<div className='container'>
				<div className='section'>
					<PageHeader
						title="Posts App"
						supportingText="A modern platform for sharing your thoughts and connecting with others." 
						hasBorderBottom
					/>

					<div className={styles.features}>
						<FeatureCard title="Create Posts" supportingText="Share your thoughts, ideas, and stories with the world." />

						<FeatureCard title="Interact" supportingText="Engage with other users through comments and discussions." />

						<FeatureCard title="Discover" supportingText="Explore a wide range of posts from different users." />
					</div>

					<div className={styles.ctas}>
						<Link href="/login">
							<Button
								variant="contained"
								sx={{
									backgroundColor: 'var(--primary-color)',
									'&:hover': {
										backgroundColor: 'var(--primary-hover-color)',
									},
									textTransform: 'none',
									fontWeight: 500,
									padding: '12px 24px',
									width: '100%',
								}}
							>
								Get Started
							</Button>
						</Link>

						<Link href="/posts">
							<Button
								variant="outlined"
								sx={{
									borderColor: 'var(--border-color)',
									color: 'var(--foreground)',
									'&:hover': {
										backgroundColor: 'var(--hover-color)',
										borderColor: 'var(--primary-color)',
									},
									textTransform: 'none',
									fontWeight: 500,
									padding: '12px 24px',
									width: '100%',
								}}
							>
								Browse Posts
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
