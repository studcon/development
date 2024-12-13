import { ISubject } from '@/types/models/ISubject'
import { ITest } from '@/types/models/ITest'
import { ITopic } from '@/types/models/ITopic'
import axiosInstance from '@/utils/axiosInstance'
import React, { useEffect, useState } from 'react'

type Props = {
	subject: ISubject
}
type TopicMaterialsWithMarks = {}

const Diary = (props: Props) => {
	const [topics, setTopics] = useState<ITopic[]>()
	const [tests, setTests] = useState<ITest[]>()
	useEffect(() => {
		// getTopics
		axiosInstance
			.get(`/user/getTopics/${props.subject.id}`)
			.then(res => {
				console.log(res.data.message)
				if (res.data.message.length > 0) setTopics(res.data.message)
			})
			.catch(console.log)

		// getTests
		// iterate topics and get all tests
		topics?.forEach(t => {
			axiosInstance
				.get(`/topic/getMaterials/${t.id}`)
				.then(res => {
					console.log(res.data.message.tests)
					if (res.data.message.tests.length > 0)
						setTests(res.data.message.tests)
				})
				.catch(console.log)
		})
	}, [props])
	return (
		<div>
			{/* title */}
			{/**/}
			{topics &&
				topics.map((topic: ITopic, idx: number) => (
					<React.Fragment key={idx}>
						<div className='font-bold text-[23px] mb-[15px]'>{topic.title}</div>
						{tests &&
							tests.map((test: ITest, idx: number) => (
								<div key={test.id} className='mb-[15px]'>
									<div className='text-[23px]'>
										{test.title} - <span className='font-bold'>5</span>
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
