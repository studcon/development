'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import arrow from '/assets/arrow.png'
import { AxiosError } from 'axios'
import axiosInstance from '@/utils/axiosInstance'
import { useParams, useRouter } from 'next/navigation'
import Students from '@/components/student/Students'
import { IGroup } from '@/types/models/IGroup'
import { IUser } from '@/types/models/IUser'

const DairyPage = () => {
	const [groups, setGroups] = useState<IGroup[]>([])
	const [students, setStudents] = useState<IUser[]>([])
	const [error, setError] = useState<AxiosError | null>(null)

	const router = useRouter()
	const params = useParams()

	const [selectedGroup, setSelectedGroup] = useState<number>(0)
	function selectGroup(e: React.MouseEvent, idx: number) {
		e.preventDefault()
		console.log('select group called')
		setSelectedGroup(groups[idx].id)
		axiosInstance
			.get(`/teacher/getStudents/${groups[idx].id}`)
			.then(res => {
				console.log(`students from group ${groups[idx].id}`)
				console.log(res.data.message)
				setStudents(res.data.message)
			})
			.catch(console.log)
	}
	useEffect(() => {
		axiosInstance
			.get(`/user/getGroups`)
			.then(res => {
				console.log(res.data.message.flat())
				setGroups(res.data.message.flat())
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
		// getSubject
	}, [selectedGroup])
	return (
		<div className='h-screen w-[1080px] mx-auto'>
			<div className='p-[25px]'>
				{/* title */}
				<div className='mb-[25px] flex items-center'>
					<div
						onClick={e => {
							e.preventDefault()
							router.back()
						}}
						className='mr-[15px]'
					>
						<Image src={arrow} width={26} height={32} alt='go back arrow' />
					</div>
					<div className='text-[35px]'>Дневник</div>
				</div>
				<div className='flex items-center'>
					{/* left */}
					<div className='p-[25px] w-[320px] h-[600px] bg-purple rounded-[22px] mr-[25px]'>
						<div className='*:mb-[2px] last:mb-0'>
							{groups.map((group: IGroup, idx: number) => (
								<div
									key={group.id}
									className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s]'
								>
									<button
										className='p-[10px] text-left text-[15px] w-full'
										onClick={e => selectGroup(e, idx)}
									>
										{group.name}
									</button>
								</div>
							))}
						</div>
					</div>

					{/* right */}
					<div className='w-[685px] relative p-[25px]  h-[600px] bg-purple rounded-[22px]'>
						{!students && 'Загрузка...'}
						{students && <Students students={students} />}
						{selectedGroup == 0 && 'Выберите группу'}
						{students.length == 0 &&
							selectedGroup != 0 &&
							'В этой группе нет студентов'}
					</div>
				</div>
			</div>
		</div>
	)
}

export default DairyPage
