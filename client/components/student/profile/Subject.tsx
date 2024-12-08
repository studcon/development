'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import arrow from '/assets/arrow.png'
import Image from 'next/image'
import { AxiosError } from 'axios'
import axiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'

type Props = {
	setIsSubjectOpen: Dispatch<SetStateAction<boolean>>
	currentSubjectId: number
}

const Subject = (props: Props) => {
	const [subject, setSubject] = useState<any>(null)
	const [topics, setTopics] = useState<any>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	useEffect(() => {
		// getSubject
		axiosInstance
			.get(`/user/getSubject/${props.currentSubjectId}`)
			.then(res => {
				console.log('currentSubjectId')
				console.log(props.currentSubjectId)

				console.log('subject')
				console.log(res.data.message)
				setSubject(res.data.message)
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
		// getTopics
		axiosInstance
			.get(`/user/getTopics/${props.currentSubjectId}`)
			.then(res => {
				setTopics(res.data.message)
				console.log(res.data.message)
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
	}, [])
	return (
		<div className='mb-[25px] w-[319px]'>
			{/* title bar */}
			<div className='flex w-full justify-center font-regular mb-[5px] text-[30px]'>
				Основное
			</div>
			<div className='flex flex-col rounded-[22px] justify-start items-center bg-purple p-[25px] min-h-[600px]'>
				{/* subject title  */}
				<div className='flex justify-start items-center w-full'>
					<div
						onClick={e => {
							e.preventDefault()
							props.setIsSubjectOpen(false)
						}}
						className='mr-[30px]'
					>
						<Image src={arrow} width={26} height={32} alt='go back arrow' />
					</div>
					<div className='text-[22px]'>{subject && subject.name}</div>
				</div>
				{/* themes */}
				<div className='flex justity-start w-full flex-col mt-[10px]'>
					{!topics && 'Загрузка...'}
					{topics &&
						topics.map((t: any) => (
							<Link key={t.id} href={`/topic/${t.id}`}>
								<div>
									<p className='text-[22px] py-[10px] px-[15px] cursor-pointer mb-[5px] rounded-[10px] transition-[0.3s] hover:bg-lightPurple hover:transition-[0.3s]'>
										{t.title}
									</p>
									<hr className='border-t-2 border-solid border-t-white mb-[5px]' />
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	)
}

export default Subject
