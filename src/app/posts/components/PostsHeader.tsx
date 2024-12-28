'use client'

import { FormControl, InputLabel, Select, MenuItem, Box, TextField, InputAdornment, useMediaQuery, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { debounce } from 'lodash'
import { usePostsContext } from '../context/PostsContext'

export default function PostsHeader() {
	const theme = useTheme()

	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const {
		itemsPerPage,
		sortField,
		sortOrder,
		setItemsPerPage,
		setSearchQuery,
		setSortField,
		setSortOrder,
		setPage,
	} = usePostsContext()

	const debouncedSearch = debounce((query: string) => {
		setSearchQuery(query)
		setPage(1)
	}, 800)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value
		debouncedSearch(query)
	}

	const handleItemsPerPageChange = (e: any) => {
		setItemsPerPage(Number(e.target.value))
		setPage(1)
	}

	const handleSortFieldChange = (e: any) => {
		setSortField(e.target.value)
	}

	const handleSortOrderChange = (e: any) => {
		setSortOrder(e.target.value)
	}

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			gap: 3
		}}>
			<Box sx={{
				display: 'flex',
				flexDirection: isMobile ? 'column' : 'row',
				alignItems: isMobile ? 'stretch' : 'center',
				justifyContent: 'space-between',
				gap: 2
			}}>
				<h1>Posts</h1>

				<Box sx={{
					display: 'flex',
					flexDirection: isMobile ? 'column' : 'row',
					gap: 2,
					width: isMobile ? '100%' : 'auto'
				}}>
					<FormControl size="small" sx={{
						minWidth: isMobile ? '100%' : 120,
					}}>
						<InputLabel id="sort-field-label">Sort by</InputLabel>
						<Select
							labelId="sort-field-label"
							value={sortField}
							label="Sort by"
							onChange={handleSortFieldChange}
						>
							<MenuItem value="id">ID</MenuItem>
							<MenuItem value="title">Title</MenuItem>
							<MenuItem value="reactions">Reactions</MenuItem>
							<MenuItem value="tags">Tags</MenuItem>
						</Select>
					</FormControl>

					<FormControl size="small" sx={{
						minWidth: isMobile ? '100%' : 120,
					}}>
						<InputLabel id="sort-order-label">Order</InputLabel>
						<Select
							labelId="sort-order-label"
							value={sortOrder}
							label="Order"
							onChange={handleSortOrderChange}
						>
							<MenuItem value="asc">Ascending</MenuItem>
							<MenuItem value="desc">Descending</MenuItem>
						</Select>
					</FormControl>

					<FormControl size="small" sx={{
						minWidth: isMobile ? '100%' : 120,
						'& .MuiSelect-select': {
							paddingRight: '32px !important'
						},
						'& .MuiSelect-icon': {
							right: '7px'
						},
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								paddingRight: 0
							}
						}
					}}>
						<InputLabel id="items-per-page-label">Posts per page</InputLabel>
						<Select
							labelId="items-per-page-label"
							value={itemsPerPage}
							label="Posts per page"
							onChange={handleItemsPerPageChange}
							MenuProps={{
								PaperProps: {
									sx: {
										'& .MuiList-root': {
											paddingRight: '0px'
										}
									}
								}
							}}
						>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={50}>50</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Box>

			<TextField
				placeholder="Search posts..."
				onChange={handleSearch}
				fullWidth
				size="small"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon sx={{ color: 'var(--secondary-text)' }} />
						</InputAdornment>
					),
				}}
				sx={{
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: 'var(--border-color)',
						},
						'&:hover fieldset': {
							borderColor: 'var(--primary-color)',
						},
						'&.Mui-focused fieldset': {
							borderColor: 'var(--primary-color)',
						},
					},
					'& .MuiInputBase-input': {
						color: 'var(--foreground)',
					},
				}}
			/>
		</Box>
	)
}
