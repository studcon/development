'use client'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import Post from './Post'

const News = () => {
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	useEffect(() => {
		// getUser
		axiosInstance
			.get('/user/getNews')
			.then(res => {
				setData(res.data.message)
				console.log(res.data.message[0])
			})
			.catch((err: AxiosError) => {
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
					{data?.map((el: any) => (
						<Post key={el.id} title={el.title} content={el.content} />
					))}
				</div>
			</div>
		</div>
	)
}

export default News
