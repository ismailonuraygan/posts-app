'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles'
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
	mode: ThemeMode;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
	mode: 'dark',
	toggleTheme: () => null,
})

export const useThemeContext = () => useContext(ThemeContext)

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState<ThemeMode>('light')

	useEffect(() => {
		const savedMode = localStorage.getItem('theme') as ThemeMode
		if (savedMode) {
			setMode(savedMode)
		}
	}, [])

	const toggleTheme = () => {
		const newMode = mode === 'light' ? 'dark' : 'light'
		setMode(newMode)
		localStorage.setItem('theme', newMode)
	}

	useEffect(() => {
		const root = document.documentElement
		root.setAttribute('data-theme', mode)

		if (mode === 'dark') {
			root.style.setProperty('--background', '#0a0a0a')
			root.style.setProperty('--foreground', '#ededed')
			root.style.setProperty('--border-color', '#333')
			root.style.setProperty('--hover-color', 'rgba(255, 255, 255, 0.1)')
			root.style.setProperty('--primary-color', '#0070f3')
			root.style.setProperty('--primary-hover-color', '#0060df')
			root.style.setProperty('--card-background', '#171717')
			root.style.setProperty('--secondary-text', '#a1a1a1')
		} else {
			root.style.setProperty('--background', '#ffffff')
			root.style.setProperty('--foreground', '#171717')
			root.style.setProperty('--border-color', '#e5e5e5')
			root.style.setProperty('--hover-color', 'rgba(0, 0, 0, 0.05)')
			root.style.setProperty('--primary-color', '#0070f3')
			root.style.setProperty('--primary-hover-color', '#0060df')
			root.style.setProperty('--card-background', '#ffffff')
			root.style.setProperty('--secondary-text', '#666666')
		}
	}, [mode])

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					primary: {
						main: '#0070f3',
					},
					background: {
						default: mode === 'dark' ? '#000' : '#fff',
						paper: mode === 'dark' ? '#111' : '#fff',
					},
				},
			}),
		[mode]
	)

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme }}>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />

				{ children }
			</MUIThemeProvider>
		</ThemeContext.Provider>
	)
}
