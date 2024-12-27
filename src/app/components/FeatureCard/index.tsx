import styles from './feature.module.css'
import { FeatureCardProps } from './types'

export default function FeatureCard({title, supportingText }: FeatureCardProps) {
	return (
		<div className={styles.feature}>
			<h3>{ title }</h3>

			<p>{ supportingText }</p>
		</div>
	)
}