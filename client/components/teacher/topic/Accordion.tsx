'use client'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import accept from '/assets/accept.svg'

interface IAnswerData {
	question: {
		title: string
		answer: {
			title: string
			correct: number
		}
	}
}

interface IProps {
	student: string
	time: string
	mark: string
	test_id: number
	user_id: number
	mark_id: number
	date: string
	update: boolean
	setUpdate: Dispatch<SetStateAction<boolean>>
}

const Accordion = (props: IProps) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const [answerData, setAnswerData] = useState<IAnswerData[] | null>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	const [newMark, setNewMark] = useState<number | null>(null)

	useEffect(() => {
		// getAnswers
		axiosInstance
			.get(`/topic/getAnswers/${props.test_id}/${props.user_id}`)
			.then(res => {
				setAnswerData(res.data.message)
			})
			.catch(err => {
				setError(err)
			})
	}, [])

	const updateMark = () => {
		axiosInstance.put(`/topic/updateMark/${props.mark_id}`, {
			mark: newMark,
		})
		props.setUpdate(!props.update)
	}

	return (
		<div className='resize-none flex flex-col bg-lightPurple w-full outline-none overflow-y-auto rounded-[12px]'>
			<div
				className='w-full bg-lightPurple h-[55px] flex items-center px-[15px] cursor-pointer'
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div className='w-full flex justify-between items-center'>
					<div className='text-[18px]'>{props.student}</div>
					<div className='text-[15px]'>
						Продолжительность: <b>{props.time}</b>
					</div>
					<div className='text-[15px]'>
						Оценка: <b>{props.mark}</b>
					</div>
					<div className={isExpanded ? 'rotate-180' : ''}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					</div>
				</div>
			</div>
			{isExpanded && (
				<div>
					<hr className='border-t-2 border-solid border-t-white mx-[15px] mb-[5px]' />
					<div className='mx-[15px] mb-[5px]'>
						{!answerData
							? 'Загрузка...'
							: answerData.map((el, index) => (
									<div className='mb-[10px]' key={index}>
										<p className='text-[18px]'>
											Вопрос {index + 1}: {el.question.title}
										</p>
										<div>
											<p>
												Ответ:{' '}
												<span
													className={
														el.question.answer.correct == 0
															? 'text-red-600'
															: 'text-green-600'
													}
												>
													{el.question.answer.title}
												</span>
											</p>
										</div>
									</div>
							  ))}
						<div className='w-full flex items-center justify-between'>
							<div>
								<p className='text-[15px]'>
									Дата выполнения: <b>{props.date}</b>
								</p>
							</div>
							<div className='flex items-center'>
								<p className='text-[18px] mr-[10px]'>Новая Оценка:</p>
								<div className='relative'>
									<input
										className='h-[40px] w-[115px] rounded-[12px] outline-none bg-background text-white text-[18px] pl-[15px]'
										type='textd'
										onChange={e => {
											if (
												+e.currentTarget.value < 0 ||
												+e.currentTarget.value > 5 ||
												isNaN(+e.currentTarget.value)
											) {
												e.currentTarget.value = '5'
											}
											setNewMark(+e.currentTarget.value)
										}}
									/>
									<Image
										src={accept}
										width={30}
										height={30}
										alt='accept'
										className='mr-[10px] absolute top-[5px] right-0 cursor-pointer transition-[0.3s] hover:brightness-75 hover:transition-[0.3s]'
										onClick={() => updateMark()}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Accordion
