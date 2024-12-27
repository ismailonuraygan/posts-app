'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { PageHeader } from './components/PageHeader'

export default function Home() {
	return (
		<div className='main'>

		<div className='container'>
			<div className='section'>
			<PageHeader title="Posts App" supportingText="A modern platform for sharing your thoughts and connecting with others." hasBorderBottom={true} />

				<div className={styles.features}>
					<div className={styles.feature}>
						<h3>Create Posts</h3>

						<p>Share your thoughts, ideas, and stories with the world.</p>
					</div>

					<div className={styles.feature}>
						<h3>Interact</h3>

						<p>Engage with other users through comments and discussions.</p>
					</div>

					<div className={styles.feature}>
						<h3>Discover</h3>

						<p>Explore a wide range of posts from different users.</p>
					</div>
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
