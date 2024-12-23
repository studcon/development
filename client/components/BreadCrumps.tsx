'use client'

import { ISubject } from '@/types/models/ISubject'
import { ITopic } from '@/types/models/ITopic'
import axiosInstance from '@/utils/axiosInstance'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const BreadCrumps = () => {
	const path = usePathname()

	const [breadCrumps, setBreadCrumps] = useState<string>('')
	const [topic, setTopic] = useState<ITopic | null>(null)
	const [subject, setSubject] = useState<ISubject | null>(null)

	const parseBreadCrumps = () => {
		// prettier-ignore
		const topicId = path
			.split('/')
			// first element can be empty. removing it
			.filter(e => e.length > 0)
      [1]
		console.log(topicId)
		axiosInstance.get(`/topic/getTopic/${topicId}`).then(res => {
			// console.log('topic')
			// console.log(res.data.message)
			setTopic(res.data.message)
		})
		axiosInstance.get(`/topic/getTopicsSubject/${topicId}`).then(res => {
			// console.log('subject')
			// console.log(res.data.message)
			setSubject(res.data.message)
		})

		const BREADCRUMPS_SEPARATOR = ' > '
		const result = [subject?.name, topic?.title].join(BREADCRUMPS_SEPARATOR)
		console.log(result)
		setBreadCrumps(result)
	}
	useEffect(() => {
		parseBreadCrumps()
	}, [])
	return <div className='text-[25px] mb-1'>{breadCrumps}</div>
}

export default BreadCrumps
