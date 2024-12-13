import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import avatar from '/assets/avatar.png'
import Link from 'next/link'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'

const Student = () => {
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
		// getGroup

		axiosInstance
			.get('/user/getGroup')
			.then(res => {
				setData((data: any) => ({
					...data,
					groupName: res.data.message[0].name,
				}))
				console.log(res.data.message[0])
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
	}, [])
	return (
		<>
			<div className='mt-[25px] ml-[25px] flex items-center'>
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
				<div>
					<div className='text-[27px] mb-[5px]'>
						{!data && 'Загрузка...'}
						{data?.surname} {data?.name} {data?.patronymic}
					</div>
					{!data && 'Загрузка...'}
					<div className='text-[30px] mb-[30px]'>{data?.groupName}</div>
					<div className='flex'>
						<div className='flex transition-[0.3s] mr-[15px] hover:bg-buttonsHover h-[75px] justify-center items-center bg-purple w-[228px] rounded-[22px]'>
							<Link href={'/portfolio'} className='w-inherit text-[30px]'>
								Портфолио
							</Link>
						</div>
						<div className='flex transition-[0.3s] hover:bg-buttonsHover h-[75px] justify-center items-center bg-purple w-[228px] rounded-[22px]'>
							<Link href={'/diary/student'} className='w-inherit text-[30px]'>
								Дневник
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Student
