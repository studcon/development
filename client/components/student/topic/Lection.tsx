import { ILecture } from '@/types/models/ILecture'
import React from 'react'

type Props = {
	lecture: ILecture
	isTest: boolean
}

const Lecture = (props: Props) => {
	return (
		<div>
			{/* title */}
			<div className='font-bold text-[23px] mb-[15px]'>
				{props.lecture.title}
			</div>
			{/* content */}
			<div>{props.lecture.content}</div>
		</div>
	)
}

export default Lecture
