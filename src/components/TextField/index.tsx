'use client'

import { TextField as MuiTextField, TextFieldProps } from '@mui/material'

export default function TextField(props: TextFieldProps) {
    return (
        <MuiTextField
            {...props}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'var(--border-color)'
                    },
                    '&:hover fieldset': {
                        borderColor: 'var(--foreground)'
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'var(--foreground)'
                    }
                },
                '& .MuiInputLabel-root': {
                    color: 'var(--secondary-text)',
                    '&.Mui-focused': {
                        color: 'var(--foreground)'
                    }
                },
                '& .MuiInputBase-input': {
                    color: 'var(--foreground)'
                },
                ...props.sx
            }}
        />
    )
}
