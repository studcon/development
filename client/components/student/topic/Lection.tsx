import { ILecture } from '@/types/models/ILecture'
import MDEditor from '@uiw/react-md-editor'
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
			<div>
				{/* @TODO: remove ts-ignore and fix type error  */}
				{/* @ts-ignore */}
				<MDEditor.Markdown
					source={props.lecture.content}
					style={{ whiteSpace: 'pre-wrap' }}
				/>
			</div>
		</div>
	)
}

export default Lecture
