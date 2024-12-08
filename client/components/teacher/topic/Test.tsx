'use client'
import { IQuestion } from '@/types/models/IQuestion'
import { ITest } from '@/types/models/ITest'
import { TQuestionData } from '@/types/TQuestionData'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import Question from './Question'
import StudentsAnswers from './StudentsAnswer'

interface IProps {
	test: ITest
	isTest: boolean
	getMaterials: () => void
}

const Test = (props: IProps) => {
	const [isStudentsAnswersOpen, setStudentsAnswersOpen] =
		useState<boolean>(false)
	const [testData, setTestData] = useState<any>(null)
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
	}, [props.test])

	const deleteTest = () => {
		axiosInstance.delete(`/topic/deleteTest/${props.test.id}`)
		props.getMaterials()
	}
	return (
		<>
			{isStudentsAnswersOpen ? (
				<StudentsAnswers
					SetStudentAnswersOpen={setStudentsAnswersOpen}
					test_id={props.test.id}
				/>
			) : (
				<div className='flex flex-col justify-between h-full'>
					<div>
						<div className='font-bold text-[23px] mb-[15px]'>
							Тест: {props.test.title}
						</div>
						{testData &&
							testData.questions?.map((q: IQuestion) => (
								<Question
									setQuestionData={setQuestionData}
									questionData={questionData}
									key={q.id}
									question={q}
								/>
							))}
					</div>
					<div className='flex leading-[3px] text-[15px] self-end mt-[25px]'>
						<button
							className='bg-lightPurple transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] w-[230px] h-[45px] flex justify-center items-center rounded-[22px] mr-[10px]'
							onClick={() => setStudentsAnswersOpen(true)}
						>
							Результаты прохождения
						</button>
						<button
							className=' bg-lightPurple transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] w-[130px] h-[45px] flex justify-center items-center rounded-[22px]'
							onClick={() => deleteTest()}
						>
							Удалить
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default Test
