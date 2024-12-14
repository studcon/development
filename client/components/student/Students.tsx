'use client'

import { useEffect, useRef, useState } from 'react'

import { IGroup } from '@/types/models/IGroup'
import { IUser } from '@/types/models/IUser'
import axiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'

type Props = {
	students: IUser[]
}

const Students = (props: Props) => {
	return (
		<div>
			{/* title div */}
			<div className='font-bold text-[23px] mb-[15px] flex justify-between items-center'>
				<div>
					<div>Студенты</div>
				</div>
			</div>
			{/* content */}
			<div>
				{/* 1 */}
				{props.students.map((student: IUser, idx: number) => (
					<Link
						key={student.id}
						href={`/diary/student?student_id=${student.id}`}
					>
						<div className='bg-lightPurple hover:bg-buttonsHover transition-[0.3s] p-[15px] text-[18px] rounded-[10px] mt-[21px] flex items-center justify-between'>
							<div className='w-fit'>
								<div className='w-[250px]'>
									{student.surname} {student.name} {student.patronymic}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Students
