import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next'

import Header from '@/components/Header'
import ThemeProvider from '@/providers/ThemeProvider'
import ToastProvider from '@/providers/ToastProvider'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

const geistSans = GeistSans
const geistMono = GeistMono

export const metadata: Metadata = {
	title: 'Posts App',
	description: 'A modern platform for sharing your thoughts',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ThemeProvider>
					<Header />

					<div id='main'>
						<div className='page-content'>
							{children}
						</div>
					</div>

					<ToastProvider />
				</ThemeProvider>
			</body>
		</html>
	)
}
