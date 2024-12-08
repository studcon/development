'use client'

import Student from '@/components/student/profile/Student'
import Groups from '@/components/teacher/profile/Groups'
import News from '@/components/teacher/profile/News'
import Subjects from '@/components/teacher/profile/Subjects'
import Teacher from '@/components/teacher/profile/Teacher'
import Topics from '@/components/teacher/profile/Topics'
import { isTeacher } from '@/utils/roleChecker'
import { useState } from 'react'

const Profile = () => {
	const [isGroupOpen, setIsGroupOpen] = useState<boolean>(false)
	const [isSubjectOpen, setIsSubjectOpen] = useState<boolean>(false)
	const [currentSubjectId, setCurrentSubjectId] = useState<number>(0)
	const [currentGroupId, setCurrentGroupId] = useState<number>(0)
	const [currentGroupName, setCurrentGroupName] = useState<string>('')
	const [currentSubjectName, setCurrentSubjectName] = useState<string>('')
	return (
		<div className='w-[1080px] h-full px-[30px] mx-auto'>
			<Teacher />
			{/* main div */}
			<div className='my-[25px] flex gap-[25px]'>
				{/* left div */}
				<div className='w-[319px] flex justify-start flex-col'>
					{isSubjectOpen ? (
						<Topics
							setIsSubjectOpen={setIsSubjectOpen}
							currentGroupName={currentGroupName}
							currentSubjectName={currentSubjectName}
							currentSubjectId={currentSubjectId}
						/>
					) : isGroupOpen ? (
						<Subjects
							setIsGroupOpen={setIsGroupOpen}
							currentGroupId={currentGroupId}
							currentGroupName={currentGroupName}
							setIsSubjectOpen={setIsSubjectOpen}
							setCurrentSubjectId={setCurrentSubjectId}
							setCurrentSubjectName={setCurrentSubjectName}
						/>
					) : (
						<Groups
							setCurrentGroupId={setCurrentGroupId}
							setIsGroupOpen={setIsGroupOpen}
							setCurrentGroupName={setCurrentGroupName}
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
