import { IMark } from '@/types/models/IMark'
import { ISubject } from '@/types/models/ISubject'
import { ITest } from '@/types/models/ITest'
import { ITopic } from '@/types/models/ITopic'
import axiosInstance from '@/utils/axiosInstance'
import React, { useEffect, useState } from 'react'

type Props = {
	subject: ISubject
}

const Diary = (props: Props) => {
	const [topics, setTopics] = useState<ITopic[]>()
	const [tests, setTests] = useState<ITest[]>()
	const [marks, setMarks] = useState<IMark[]>()

	useEffect(() => {
		const fetchDiaryData = async () => {
			try {
				// Fetch topics
				const topicResponse = await axiosInstance.get(
					`/user/getTopics/${props.subject.id}`,
				)
				if (topicResponse.data.message.length > 0) {
					setTopics(topicResponse.data.message)
				}

				// Fetch tests for each topic
				const testPromises = topicResponse.data.message.map(
					async (topic: ITopic) => {
						const testResponse = await axiosInstance.get(
							`/topic/getMaterials/${topic.id}`,
						)
						return testResponse.data.message.tests || []
					},
				)

				const allTests = await Promise.all(testPromises)
				setTests(allTests.flat())

				// Fetch marks for each test
				const markPromises = allTests.flat().map(async (test: ITest) => {
					const markResponse = await axiosInstance.get(
						`/topic/getMark/${test.id}`,
					)
					return markResponse.data.message || null
				})

				const allMarks = await Promise.all(markPromises)
				setMarks(allMarks.filter(Boolean))
			} catch (error) {
				console.error('Error fetching diary data:', error)
			}
		}

		fetchDiaryData()
	}, [props.subject])
	return (
		<div>
			{/* title */}
			{/**/}
			{(!topics || !tests || !marks) && 'Загрузка...'}
			{topics &&
				topics.map((topic: ITopic, idx: number) => (
					<React.Fragment key={idx}>
						<div className='font-bold text-[23px] mb-[15px]'>{topic.title}</div>
						{tests &&
							tests
								.filter(t => t.topic_id == topic.id)
								.map((test: ITest, idx: number) => (
									<div key={test.id} className='mb-[15px]'>
										<div className='text-[23px]'>
											{test.title} -{' '}
											<span className='font-bold'>
												{marks &&
													marks.map(m =>
														m.test_id === test.id ? m.mark : 'не пройдено',
													)}
											</span>
										</div>
										<hr className='border-t-2 border-solid border-t-white mt-[15px]' />
									</div>
								))}
					</React.Fragment>
				))}
			{/* content */}
		</div>
	)
}

export default Diary
