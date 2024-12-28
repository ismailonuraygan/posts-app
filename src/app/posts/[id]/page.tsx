'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './post.module.css'
import { useRequest } from '../../api'
import { IPost } from '@/types/post'

export default function Post() {
	const req = useRequest()

	const [post, setPost] = useState<IPost | null>(null)

	const { id } = useParams()

	useEffect(() => {
		if (id) {
			const fetchPost = async () => {
				try {
					const data = await req.get(`/posts/${id}`)
					console.log(data.data)
					setPost(data.data)
				} catch (error) {
					console.error('Error fetching post:', error)
				}
			}
			fetchPost()
		}
	}, [id])

	if (!post) return <div>Loading...</div>

	return (
		<div className={styles.postPage}>
			<h1>{ post.title }</h1>

			<p>{ post.body }</p>
		</div>
	)
}
