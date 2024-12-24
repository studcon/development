'use client'

import { ILecture } from '@/types/models/ILecture'
import { ISubject } from '@/types/models/ISubject'
import { ITest } from '@/types/models/ITest'
import { ITopic } from '@/types/models/ITopic'
import { TBreadCrump } from '@/types/TBreadCrump'
import axiosInstance from '@/utils/axiosInstance'
import { isTeacher } from '@/utils/roleChecker'
import Link from 'next/link'
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
	const role = isTeacher() ? 'teacher' : 'student'

	const BREADCRUMPS_SEPARATOR = ' > '

	const [breadCrumps, setBreadCrumps] = useState<TBreadCrump[]>([])
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
			// fetching the topic
			.get(`/topic/getTopic/${topicId}`)
			.then(res => {
				// console.log('topic')
				// console.log(res.data.message)
				setTopic(res.data.message)
				// after it if topic is fetched, fetching the subject
				axiosInstance
					// @FIXME: topic is not being loaded at first request
					.get(`/topic/getTopicsSubject/${topicId}`)
					.then(res => {
						setSubject(res.data.message)
						// building final result
						console.log(subject, topic)
						const result: TBreadCrump[] = [
							{ text: subject?.name, href: '/profile/student' },
							{ text: topic?.title, href: `/topic/${topicId}/${role}` },
							{
								text:
									props.tab.props.lecture?.title || props.tab.props.test?.title,
								href: path, // @NOTE: redirect to the same place. maybe leave it blank?
							},
						]
						console.log('result')
						console.log(result)
						setBreadCrumps(result)
					})
					.catch(console.log)
			})
			.catch(console.log)
	}, [props])
	return (
		<div className='text-[25px] mb-1'>
			{breadCrumps.map((bc, idx) => (
				<Link key={idx} href={bc.href}>
					{idx > 0 && BREADCRUMPS_SEPARATOR}
					<span className='hover:underline'>{bc.text}</span>
				</Link>
			))}
		</div>
	)
}

export default BreadCrumps
