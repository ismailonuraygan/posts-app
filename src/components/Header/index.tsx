'use client'

import { ArrowBack, Add, Login, DarkMode, LightMode } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { useThemeContext } from '@/providers/ThemeProvider'
import clsx from 'clsx'

export default function Header() {
	const router = useRouter()

	const pathname = usePathname()

	const [canGoBack, setCanGoBack] = useState(false)

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const { mode, toggleTheme } = useThemeContext()

	const handleBack = () => {
		router.back()
	}

	const isPostsPage = pathname === '/posts'

	const isLoginPage = pathname === '/login'

	const [scrollingDown, setScrollingDown] = useState(false)

	let lastScrollTop = 0

	useEffect(() => {
		const handleScroll = () => {
			let st = window.scrollY || document.documentElement.scrollTop

			if (st > lastScrollTop) {
				setScrollingDown(true)
			} else if (st === 0) {
				setScrollingDown(false)
			}

			lastScrollTop = st <= 0 ? 0 : st
		}

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		setCanGoBack(window.history.length > 1)

		const accessToken = localStorage.getItem('accessToken')

		setIsLoggedIn(!!accessToken)
	}, [pathname])

	return (
		<header className={clsx(styles['header'], { [styles['--scrolling-down']]: scrollingDown })}>
			{
				isPostsPage && (
					<button onClick={handleBack} className={styles.backButton}>
						<ArrowBack />
					</button>
				)
			}

			<Link href="/">
				<h1 className={`${styles.title} ${!canGoBack ? styles.noBackButton : ''}`}>
					Posts App
				</h1>
			</Link>

			<div className={styles.actions}>
				<IconButton
					onClick={toggleTheme}
					sx={
						{
							color: 'var(--text-color)',
						}
					}
				>
					{ mode === 'dark' ? <LightMode /> : <DarkMode /> }
				</IconButton>

				{
					isPostsPage && isLoggedIn &&
						<Link href="/posts/create">
							<button className={styles.createButton}>
								<Add />
							</button>
						</Link>
				}

				{
					!isLoggedIn && !isLoginPage &&
						<Link href="/login" className={styles.loginLink}>
							<Button
								variant="contained"
								startIcon={<Login />}
								size="small"
								sx={
									{
										backgroundColor: 'var(--primary-color)',
										'&:hover': {
											backgroundColor: 'var(--primary-hover-color)'
										}
									}
								}
							>
								Login
							</Button>
						</Link>
				}
			</div>
		</header>
	)
}
