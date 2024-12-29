import styles from './feature.module.css'
import { FeatureCardProps } from './types'

export default function FeatureCard({title, supportingText }: FeatureCardProps) {
	return (
		<div className={styles.feature}>
			<h1>{ title }</h1>

			<p>{ supportingText }</p>
		</div>
	)
}