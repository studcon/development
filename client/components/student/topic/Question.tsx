'use client'

import { IAnswer } from '@/types/models/IAnswer'
import { IQuestion } from '@/types/models/IQuestion'
import { TQuestionData } from '@/types/TQuestionData'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
	question: IQuestion
	questionData: TQuestionData[]
	setQuestionData: Dispatch<SetStateAction<TQuestionData[]>>
}

const Question = ({ question, questionData, setQuestionData }: Props) => {
	return (
		<div className='mb-[15px]'>
			{/* question content */}
			<div className='text-[18px] mb-[10px]'>{question.title}</div>
			{/* answers wrapper */}
			<div className='flex flex-wrap'>
				{question.answers.map((a: IAnswer, idx: number) => (
					<label key={a.id} className='container'>
						{a.title}
						<input
							type='radio'
							id={a.id.toString()}
							name={a.question_id.toString()}
							defaultChecked={idx === 0}
							onChange={e => {
								setQuestionData(data =>
									data.filter(x => x.question_id !== a.question_id),
								)
								setQuestionData(data => [
									...data,
									{
										question_id: a.question_id,
										answer_id: Number(e.target.id),
									},
								])
							}}
						/>
						<span className='checkmark'></span>
					</label>
				))}
			</div>
		</div>
	)
}

export default Question
