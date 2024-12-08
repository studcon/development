'use client'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import arrow from '/assets/arrow.png'

interface IProps {
	setIsGroupOpen: Dispatch<SetStateAction<boolean>>
	currentGroupName: string
	currentGroupId: number
	setIsSubjectOpen: Dispatch<SetStateAction<boolean>>
	setCurrentSubjectId: Dispatch<SetStateAction<number>>
	setCurrentSubjectName: Dispatch<SetStateAction<string>>
}

const Subjects = (props: IProps) => {
	const [subjects, setSubjects] = useState<any>(null)
	const [topics, setTopics] = useState<any>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	useEffect(() => {
		// getSubjects
		axiosInstance
			.get(`/user/getSubjects/${props.currentGroupId}`)
			.then(res => {
				console.log('currentGroupId')
				console.log(props.currentGroupId)

				console.log('subjects')
				console.log(res.data.message)
				setSubjects(res.data.message)
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
			<div className='flex flex-col rounded-[22px] justify-start bg-purple p-[25px] h-[600px] overflow-scroll'>
				{/* subject title  */}
				<div className='flex justify-start items-center w-full mb-[10px]'>
					<div className='mr-[30px]'>
						<Image
							src={arrow}
							width={26}
							height={32}
							alt='go back arrow'
							className='cursor-pointer transition-[0.3s] hover:brightness-75 hover:transition-[0.3s]'
							onClick={e => {
								e.preventDefault()
								props.setIsGroupOpen(false)
							}}
						/>
					</div>
					<div className='text-[22px]'>{props.currentGroupName}</div>
				</div>
				{!subjects && 'Загрузка предметов...'}
				{subjects &&
					subjects.map((el: any) => (
						<div key={el.id}>
							<p
								className='text-[22px] py-[10px] px-[15px] cursor-pointer mb-[5px] rounded-[10px] transition-[0.3s] hover:bg-lightPurple hover:transition-[0.3s]'
								onClick={e => {
									e.preventDefault()
									props.setIsSubjectOpen(true)
									props.setCurrentSubjectId(el.id)
									props.setCurrentSubjectName(el.name)
								}}
							>
								{el.name}
							</p>
							<hr className='border-t-2 border-solid border-t-white mb-[5px]' />
						</div>
					))}
			</div>
		</div>
	)
}

export default Subjects
