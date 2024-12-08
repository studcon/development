'use client'

import React, { useEffect, useState } from 'react'
import Post from './Post'
import axiosInstance from '@/utils/axiosInstance'
import { IPost } from '@/types/models/IPost'

const News = () => {
	const [data, setData] = useState<any>()
	const [error, setError] = useState<any>()
	useEffect(() => {
		axiosInstance
			.get('/user/getNews')
			.then(res => {
				console.log(res.data.message)
				setData(res.data.message)
			})
			.catch(err => {
				console.log(err)
				setError(err)
			})
	}, [])

	return (
		<div className='mb-[25px] w-[686px]'>
			{/* inner div */}
			<div className='flex w-full justify-center font-regular text-[30px] mb-[5px]'>
				Новости
			</div>
			{/* @TODO: fix scroller styles */}
			<div className='flex flex-col rounded-[22px] px-[25px] justify-start items-start min-start h-[600px] bg-purple'>
				{/* news */}
				<div className='w-full overflow-y-auto my-[25px]'>
					{!data && 'Загрузка...'}
					{data && data.map((p: IPost) => <Post key={p.id} post={p} />)}
				</div>
			</div>
		</div>
	)
}

export default News
