import { IAnswer } from '@/types/models/IAnswer'
import { IQuestion } from '@/types/models/IQuestion'
import { TQuestionData } from '@/types/TQuestionData'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
	question: IQuestion
	questionData: TQuestionData[]
	setQuestionData: Dispatch<SetStateAction<TQuestionData[]>>
}

const Question = (props: IProps) => {
	return (
		<div className='mb-[15px]'>
			<div className='text-[18px] mb-[10px]'>{props.question.title}</div>
			<div className='flex flex-wrap'>
				<ol className='list-decimal pl-[15px]'>
					{props.question.answers.map((answer: IAnswer) => (
						<li
							className={answer.correct ? 'text-green-600' : ''}
							key={answer.id}
						>
							{answer.title}
						</li>
					))}
				</ol>
			</div>
		</div>
	)
}

export default Question
