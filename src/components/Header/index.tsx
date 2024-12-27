'use client'

import { ArrowBack, Add, Login, DarkMode, LightMode } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { useThemeContext } from '@/providers/ThemeProvider'

export default function Header() {
	const router = useRouter()

	const pathname = usePathname()

	const [canGoBack, setCanGoBack] = useState(false)

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const { mode, toggleTheme } = useThemeContext()

	useEffect(() => {
		setCanGoBack(window.history.length > 1)
	}, [pathname])

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		setIsLoggedIn(!!accessToken)
	}, [pathname])

	const handleBack = () => {
		router.back()
	}

	const isPostsPage = pathname === '/posts'

	const isLoginPage = pathname === '/login'

	return (
		<header className={styles.header}>
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
