import { ISubject } from '@/types/models/ISubject'
import React from 'react'

type Props = {
	subject: ISubject
}

const Diary = (props: Props) => {
	return <div>Diary of {props.subject && props.subject.name}</div>
}

export default Diary
