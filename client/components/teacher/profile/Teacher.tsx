'use client'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import avatar from '/assets/avatar.png'
import Cookies from 'js-cookie'
const Teacher = () => {
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	useEffect(() => {
		// getUser
		axiosInstance
			.get('/user/getUser')
			.then(res => {
				setData(res.data.message)
				console.log(res.data.message)
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
	}, [])

	return (
		<div className='mt-[25px] ml-[25px] flex'>
			{/* avatar */}
			<div className='mr-[15px]'>
				<Image
					src={avatar}
					className='rounded-[10px]'
					width={180}
					height={180}
					alt='avatar'
				/>
			</div>
			{/* name and portfolio */}
			<div className='flex flex-col justify-center'>
				<div className='text-[27px] mb-[5px]'>
					{!data && 'Загрузка...'}
					{data?.surname} {data?.name} {data?.patronymic}
				</div>
				<Link
					href={'/portfolio'}
					className='flex h-[75px] justify-center items-center bg-purple hover:bg-buttonsHover hover:transition-[0.3s] transition-[0.3s] w-[228px] rounded-[22px] text-[30px]'
				>
					<span className=''>Портфолио</span>
				</Link>
			</div>
		</div>
	)
}

export default Teacher
