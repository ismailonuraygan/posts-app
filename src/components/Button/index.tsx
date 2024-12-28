'use client'

import { Button as MuiButton, ButtonProps } from '@mui/material'

export default function Button(props: ButtonProps) {
    return (
        <MuiButton
            {...props}
            sx={{
                bgcolor: 'var(--foreground)',
                color: 'var(--background)',
                '&:hover': {
                    bgcolor: 'var(--foreground)',
                    opacity: 0.9
                },
                '&.Mui-disabled': {
                    bgcolor: 'var(--border-color)',
                    color: 'var(--secondary-text)'
                },
                ...props.sx
            }}
        />
    )
}
