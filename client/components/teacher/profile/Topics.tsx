'use client'

import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import accept from '/assets/accept.svg'
import arrowRight from '/assets/arrow-right.png'
import arrow from '/assets/arrow.png'
import cancel from '/assets/cancel.svg'

interface IProps {
	setIsSubjectOpen: Dispatch<SetStateAction<boolean>>
	currentGroupName: string
	currentSubjectName: string
	currentSubjectId: number
}

const Topics = (props: IProps) => {
	const [isAddGroupOpen, setAddGroupOpen] = useState(false)
	const [topics, setTopics] = useState<any>(null)
	const [topicTitle, setTopicTitle] = useState<string>('')
	const [error, setError] = useState<AxiosError | null>(null)
	useEffect(() => {
		// getSubjects
		axiosInstance
			.get(`/user/getTopics/${props.currentSubjectId}`)
			.then(res => {
				setTopics(res.data.message)
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
	}, [])

	const addTopic = () => {
		if (topicTitle != '') {
			axiosInstance.post('/user/addTopic', {
				title: topicTitle,
				subject_id: props.currentSubjectId,
			})
			axiosInstance
				.get(`/user/getTopics/${props.currentSubjectId}`)
				.then(res => {
					setTopics(res.data.message)
				})
				.catch((err: AxiosError) => {
					setError(err)
				})
			setAddGroupOpen(false)
		}
	}
	return (
		<div className='relative'>
			{/* title bar */}
			<div className='flex w-full justify-center font-regular mb-[5px] text-[30px]'>
				Основное
			</div>
			<div className='flex flex-col rounded-[22px_22px_0px_0px] justify-start items-center bg-purple p-[25px] h-[525px]  w-[319px] overflow-scroll'>
				{/* subject title  */}
				<div className='flex justify-start items-center w-full'>
					<div className='mr-[30px]'>
						<Image
							src={arrow}
							width={26}
							height={32}
							alt='go back arrow'
							className='cursor-pointer transition-[0.3s] hover:brightness-75 hover:transition-[0.3s]'
							onClick={e => {
								e.preventDefault()
								props.setIsSubjectOpen(false)
							}}
						/>
					</div>
					<div className='text-[22px] overflow-hidden'>
						{props.currentSubjectName}
					</div>
				</div>
				{/* groups */}
				<div className='flex justity-start w-full flex-col text-[18px] mt-[10px]'>
					<p className='text-[20px] mb-[15px]'>
						Группа {props.currentGroupName}
					</p>
					<div>
						{!topics && 'Загрузка...'}
						{topics &&
							topics.map((el: any) => (
								<div key={el.id}>
									<Link
										href={`/topic/${el.id}`}
										className='flex justify-between items-center mb-[10px] transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] p-[10px] rounded-[10px]'
									>
										<p className='break-words overflow-hidden'>{el.title}</p>
										<Image
											src={arrowRight}
											width={18}
											height={15}
											alt='go to page'
										/>
									</Link>
								</div>
							))}
					</div>
				</div>
			</div>
			{isAddGroupOpen ? (
				<div className='flex justify-between bg-background absolute w-full h-[50px] left-0 bottom-[75px]'>
					<input
						type='text'
						className='px-[15px] h-full w-[230px] bg-background text-[18px] mr-[5px]'
						maxLength={30}
						placeholder='Введите тему'
						onInput={(input: FormEvent<HTMLInputElement>) =>
							setTopicTitle(input.currentTarget.value)
						}
					/>
					<div className='flex mr-[15px]'>
						<Image
							src={accept}
							width={30}
							height={30}
							alt='accept'
							className='mr-[10px] cursor-pointer transition-[0.3s] hover:brightness-75 hover:transition-[0.3s]'
							onClick={() => addTopic()}
						/>
						<Image
							src={cancel}
							width={30}
							height={30}
							alt='cancel'
							className='cursor-pointer transition-[0.3s] hover:brightness-75 hover:transition-[0.3s]'
							onClick={() => setAddGroupOpen(false)}
						/>
					</div>
				</div>
			) : (
				''
			)}

			<div
				className='flex justify-center items-center cursor-pointer bg-lightPurple transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] h-[75px] rounded-[0px_0px_22px_22px] text-[25px]'
				onClick={() => setAddGroupOpen(!isAddGroupOpen)}
			>
				Добавить
			</div>
		</div>
	)
}

export default Topics
