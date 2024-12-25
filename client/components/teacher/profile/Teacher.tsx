'use client'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import defaultAvatar from '/assets/avatar.png'
import Cookies from 'js-cookie'
import { AVATARS_URL } from '@/constants'
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
					src={data?.photo ? AVATARS_URL + data.photo : defaultAvatar}
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
				<div className='flex'>
					<div className='flex transition-[0.3s] mr-[15px] hover:bg-buttonsHover h-[75px] justify-center items-center bg-purple w-[228px] rounded-[22px]'>
						<Link href={'/portfolio'} className='w-inherit text-[30px]'>
							Портфолио
						</Link>
					</div>
					<div className='flex transition-[0.3s] hover:bg-buttonsHover h-[75px] justify-center items-center bg-purple w-[228px] rounded-[22px]'>
						<Link href={'/diary/teacher'} className='w-inherit text-[30px]'>
							Дневник
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Teacher
