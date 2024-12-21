'use client'

import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ISubject } from '@/types/models/ISubject'

type Props = {
	setIsSubjectOpen: Dispatch<SetStateAction<boolean>>
	setCurrentSubjectId: Dispatch<SetStateAction<number>>
}

const Subjects = (props: Props) => {
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	useEffect(() => {
		axiosInstance
			.get('/user/getSubjects')
			.then(res => {
				setData(res.data.message)
				console.log(res.data.message)
			})
			.catch((err: AxiosError) => {
				setError(err)
			})
	}, [])
	return (
		<div className='mb-[25px] w-[319px]'>
			{/* title bar */}
			<div className='flex w-full justify-center font-regular mb-[5px] text-[30px]'>
				Основное
			</div>
			<div
				id='student__subjects'
				className='flex flex-col rounded-[22px] justify-start bg-purple p-[25px] h-[600px] overflow-scroll'
			>
				{!data && 'Загрузка предметов...'}
				{data &&
					data.map((s: ISubject) => (
						<div
							key={s.id}
							onClick={e => {
								e.preventDefault()
								props.setIsSubjectOpen(true)
								props.setCurrentSubjectId(s.id)
							}}
						>
							<p className='text-[22px] py-[10px] px-[15px] cursor-pointer mb-[5px] rounded-[10px] transition-[0.3s] hover:bg-lightPurple hover:transition-[0.3s]'>
								{s.name}
							</p>
							<hr className='border-t-2 border-solid border-t-white mb-[5px]' />
						</div>
					))}
			</div>
		</div>
	)
}

export default Subjects
