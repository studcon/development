'use client'

import { ILecture } from '@/types/models/ILecture'
import { ISubject } from '@/types/models/ISubject'
import { ITest } from '@/types/models/ITest'
import { ITopic } from '@/types/models/ITopic'
import axiosInstance from '@/utils/axiosInstance'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type InnerProps = {
	isTest: boolean
	// optional, cause we don't know
	// type of tab from here
	lecture?: ILecture
	test?: ITest
}

type Props = {
	tab: React.ReactElement<InnerProps>
}

const BreadCrumps = (props: Props) => {
	const path = usePathname()

	const [breadCrumps, setBreadCrumps] = useState<string>('')
	const [topic, setTopic] = useState<ITopic | null>(null)
	const [subject, setSubject] = useState<ISubject | null>(null)

	useEffect(() => {
		// prettier-ignore
		console.log(path)
		const topicId = path
			.split('/')
			// first element can be empty. removing it
			.filter(e => e.length > 0)[1]
		console.log(topicId)
		axiosInstance
			.get(`/topic/getTopic/${topicId}`)
			.then(res => {
				// console.log('topic')
				// console.log(res.data.message)
				setTopic(res.data.message)
			})
			.catch(console.log)
		axiosInstance
			.get(`/topic/getTopicsSubject/${topicId}`)
			.then(res => {
				// console.log('subject')
				// console.log(res.data.message)
				setSubject(res.data.message)
			})
			.catch(console.log)
		const BREADCRUMPS_SEPARATOR = ' > '
		console.log(subject, topic)
		const result = [
			subject?.name,
			topic?.title,
			props.tab.props.lecture?.title || props.tab.props.test?.title,
		].join(BREADCRUMPS_SEPARATOR)
		console.log(result)
		setBreadCrumps(result)
	}, [props])
	return <div className='text-[25px] mb-1'>{breadCrumps}</div>
}

export default BreadCrumps
