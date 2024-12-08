'use client'

import News from '@/components/student/profile/News'
import Student from '@/components/student/profile/Student'
import Subject from '@/components/student/profile/Subject'
import Subjects from '@/components/student/profile/Subjects'
import { useState } from 'react'

const Profile = () => {
	const [isSubjectOpen, setIsSubjectOpen] = useState<boolean>(false)
	const [currentSubjectId, setCurrentSubjectId] = useState<number>(0)
	return (
		<div className='w-[1080px] h-full px-[30px] mx-auto'>
			<Student />
			{/* main div */}
			<div className='mt-[25px] flex gap-[25px]'>
				{/* left div */}
				<div className='w-full flex justify-center flex-col'>
					{isSubjectOpen ? (
						<Subject
							currentSubjectId={currentSubjectId}
							setIsSubjectOpen={setIsSubjectOpen}
						/>
					) : (
						<Subjects
							setCurrentSubjectId={setCurrentSubjectId}
							setIsSubjectOpen={setIsSubjectOpen}
						/>
					)}
				</div>
				{/* right div */}
				<div className='w-full flex justify-center flex-col'>
					<News />
				</div>
			</div>
		</div>
	)
}

export default Profile
