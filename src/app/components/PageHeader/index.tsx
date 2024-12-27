'use client'

import { PageHeaderProps } from './types'
import styles from './pageHeader.module.css'
import clsx from 'clsx'

export const PageHeader = ({
	title,
	supportingText,
	extraSupportingText,
	children,
	isCentered = false,
	hasBorderBottom = true,
}: PageHeaderProps) => {
	return (
		<div
			className={clsx(styles['page-header'], {
				[styles['--border-bottom']]: hasBorderBottom,
			})}
		>
			<div
				className={clsx(styles['page-header__content'], {
					[styles['--is-centered']]: isCentered,
				})}
			>
				<div className={styles['page-header__title-container']}>
					<h1 className={styles['page-header__title']}>{title}</h1>

					{supportingText && (
						<p
							className={clsx(styles['page-header__supporting-text'], {
								[styles['--extra']]: extraSupportingText,
							})}
						>
							{supportingText}
						</p>
					)}
					{extraSupportingText && (
						<p className={styles['page-header__supporting-text']}>
							{extraSupportingText}
						</p>
					)}
				</div>
				{children && (
					<div className={styles['page-header__children']}>{children}</div>
				)}
			</div>
		</div>
	)
}