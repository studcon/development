'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import arrow from '/assets/arrow.png'
import { AxiosError } from 'axios'
import axiosInstance from '@/utils/axiosInstance'
import { useParams, useRouter } from 'next/navigation'
import { ITest } from '@/types/models/ITest'
import { ILecture } from '@/types/models/ILecture'
import Lection from '@/components/student/topic/Lection'
import Test from '@/components/student/topic/Test'

const Topic = () => {
	const [subject, setSubject] = useState<any>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	const [tabs, setTabs] = useState<React.JSX.Element[]>([])

	const router = useRouter()
	const params = useParams()

	// const tabs = [
	// 	<Lection title='lection 1' isTest={false} lectionId={1} />,
	// 	<Lection title='lection 2' isTest={false} lectionId={2} />,
	// 	<Test title='test 1' isTest={true} testId={1} />,
	// 	<Test title='test 2' isTest={true} testId={2} />,
	// ]

	useEffect(() => {
		// getMaterials

		axiosInstance
			.get(`/topic/getMaterials/${params.id}`)
			.then(res => {
				setSubject(res.data.message)
				console.log(res.data.message)

				res.data.message.lectures.forEach((lecture: ILecture) => {
					setTabs(tabs => [
						...tabs,
						<Lection lecture={lecture} isTest={false} />,
					])
				})
				res.data.message.tests.forEach((test: ITest) => {
					setTabs(tabs => [...tabs, <Test test={test} isTest={true} />])
				})
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
		// getSubject
		axiosInstance
			.get(`/user/getSubject/${params.id}`)
			.then(res => {
				setSubject(res.data.message)
				console.log(res.data.message)
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
	}, [])
	const [selectedTab, setSelectedTab] = useState<number>(0)
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
					<div className='text-[35px]'>{subject && subject.name}</div>
				</div>
				<div className='flex items-center'>
					{/* left */}
					<div className='p-[25px] w-[320px] h-[600px] bg-purple rounded-[22px] mr-[25px]'>
						<div className='*:mb-[2px] last:mb-0'>
							{tabs.map((tab: React.JSX.Element, idx: number) => (
								<div
									key={idx}
									className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s]'
								>
									<button
										className='p-[10px] text-left text-[15px] w-full'
										onClick={e => {
											e.preventDefault()
											setSelectedTab(idx)
										}}
									>
										{!tab.props.isTest
											? tab.props.lecture.title
											: 'Тест: ' + tab.props.test.title}
									</button>
								</div>
							))}
						</div>
					</div>

					{/* right */}
					<div className='w-[685px] relative p-[25px]  h-[600px] bg-purple rounded-[22px]'>
						{tabs[selectedTab]}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Topic
