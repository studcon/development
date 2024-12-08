'use client'

import React, { useEffect, useState } from 'react'
import Question from './Question'
import { useStopwatch } from 'react-timer-hook'
import { ITest } from '@/types/models/ITest'
import { AxiosError } from 'axios'
import axiosInstance from '@/utils/axiosInstance'
import { IQuestion } from '@/types/models/IQuestion'
import { TQuestionData } from '@/types/TQuestionData'
import { useRouter } from 'next/navigation'

type Props = {
	test: ITest
	isTest: boolean
}
const Test = (props: Props) => {
	const router = useRouter()
	const [testData, setTestData] = useState<any>(null)
	const [mark, setMark] = useState<any>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	const [questionData, setQuestionData] = useState<TQuestionData[]>([])

	useEffect(() => {
		// getTest
		axiosInstance
			.get(`/topic/getTest/${props.test.id}`)
			.then(res => {
				setTestData(res.data.message)
				console.log(res.data.message)
			})
			.catch(err => {
				setError(err)
			})
		// getMark
		axiosInstance
			.get(`/topic/getMark/${props.test.id}`)
			.then(res => {
				setMark(res.data.message)
				console.log(res.data.message)
			})
			.catch(err => {
				setError(err)
			})
	}, [])

	function submitTest(e: any) {
		e.preventDefault()
		console.log(questionData)
		const body = {
			test_id: props.test.id,
			time: minutes + ':' + seconds,
			questions: questionData.map(qd => ({
				id: qd.question_id,
				answer_id: qd.answer_id,
			})),
		}

		console.log(body)
		axiosInstance
			.post('/topic/sendTest', body)
			.then(res => {
				console.log(res.data.message)
				// window.location.reload()
				axiosInstance
					.get(`/topic/getMark/${props.test.id}`)
					.then(res => {
						setMark(res.data.message)
						console.log(res.data.message)
					})
					.catch(err => {
						setError(err)
					})
			})
			.catch(err => {
				setError(err)
				console.log(err)
			})
	}

	const { seconds, minutes } = useStopwatch({
		autoStart: typeof mark != 'number',
	})
	return (
		<div>
			{/* title */}
			<div className='font-bold text-[23px] mb-[15px]'>{props.test.title}</div>
			{/* question 1 */}
			{!mark &&
				testData?.questions?.map((q: IQuestion) => (
					<Question
						setQuestionData={setQuestionData}
						questionData={questionData}
						key={q.id}
						question={q}
					/>
				))}
			{mark && (
				<>
					<div className='flex justify-center mb-[15px] text-2xl w-full h-full items-center text-white'>
						Тест Проиден
					</div>
					<div className='flex justify-center items-center text-5xl text-white w-full h-full'>
						{mark}
					</div>
				</>
			)}
			<div className='absolute left-[25px] bottom-[25px] flex justify-center items-center rounded-[22px] text-[23px] font-bold'>
				<span>{minutes}:</span>
				<span>{seconds}</span>
			</div>
			<div
				onClick={submitTest}
				className='transition-[0.3s] hover:bg-buttonsHover absolute right-[25px] bottom-[25px] bg-lightPurple w-[130px] leading-[15px] h-[45px] flex justify-center items-center rounded-[22px] text-[15px]'
			>
				Отправить
			</div>
		</div>
	)
}

export default Test
