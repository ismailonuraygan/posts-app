'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { PageHeader } from './components/PageHeader'
import FeatureCard from './components/FeatureCard'

export default function Home() {
	return (
		<div className='main'>

		<div className='container'>
			<div className='section'>
			<PageHeader title="Posts App" supportingText="A modern platform for sharing your thoughts and connecting with others." hasBorderBottom={true} />

				<div className={styles.features}>
					<FeatureCard title="Create Posts" supportingText="Share your thoughts, ideas, and stories with the world." />

					<FeatureCard title="Interact" supportingText="Engage with other users through comments and discussions." />

					<FeatureCard title="Discover" supportingText="Explore a wide range of posts from different users." />
				</div>

				<div className={styles.ctas}>
					<Link href="/login" className={styles.primary}>
						Get Started
					</Link>

					<Link href="/posts" className={styles.secondary}>
						Browse Posts
					</Link>
				</div>
			</div>
		</div>
		</div>
	)
}
