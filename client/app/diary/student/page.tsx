'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import arrow from '/assets/arrow.png'
import { AxiosError } from 'axios'
import axiosInstance from '@/utils/axiosInstance'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Diary from '@/components/diary/student/Diary'
import { ISubject } from '@/types/models/ISubject'
import Cookies from 'js-cookie'

const DairyPage = () => {
	const [subjects, setSubjects] = useState<ISubject[]>([])
	const [error, setError] = useState<AxiosError | null>(null)

	const router = useRouter()
	const params = useSearchParams()

	useEffect(() => {
		console.log('url params')
		const studentId = params.get('student_id')
		console.log(studentId)
		if (studentId != null) {
			localStorage.setItem('real_user_id', Cookies.get('user_id')!)
			Cookies.set('user_id', studentId)
		}
		axiosInstance
			.get(`/user/getSubjects`)
			.then(res => {
				setSubjects(res.data.message)
				console.log(res.data.message)
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
		return () => {
			const realUserId = localStorage.getItem('real_user_id')
			if (realUserId != null) Cookies.set('user_id', realUserId)
		}
	}, [])

	const [selectedSubject, setSelectedSubject] = useState<number>(0)
	return (
		<div className='h-screen w-[1080px] mx-auto'>
			<div className='p-[25px]'>
				{/* title */}
				<div className='mb-[25px] flex items-center'>
					<div
						onClick={e => {
							e.preventDefault()
							router.back()
						}}
						className='mr-[15px]'
					>
						<Image src={arrow} width={26} height={32} alt='go back arrow' />
					</div>
					<div className='text-[35px]'>Дневник</div>
				</div>
				<div className='flex items-center'>
					{/* left */}
					<div className='p-[25px] w-[320px] h-[600px] bg-purple rounded-[22px] mr-[25px]'>
						<div className='*:mb-[2px] last:mb-0'>
							{subjects.map((subject: ISubject, idx: number) => (
								<div
									key={subject.id}
									className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s]'
								>
									<button
										className='p-[10px] text-left text-[15px] w-full'
										onClick={e => {
											e.preventDefault()
											setSelectedSubject(idx)
										}}
									>
										{subject.name}
									</button>
								</div>
							))}
						</div>
					</div>

					{/* right */}
					<div className='w-[685px] relative p-[25px]  h-[600px] bg-purple rounded-[22px]'>
						<Diary subject={subjects[selectedSubject]} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default DairyPage
