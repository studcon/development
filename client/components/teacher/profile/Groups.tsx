'use client'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IProps {
	setIsGroupOpen: Dispatch<SetStateAction<boolean>>
	setCurrentGroupId: Dispatch<SetStateAction<number>>
	setCurrentGroupName: Dispatch<SetStateAction<string>>
}

const Groups = (props: IProps) => {
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	useEffect(() => {
		// getUser
		axiosInstance
			.get('/user/getGroups')
			.then(res => {
				setData(res.data.message[0])
				console.log(res.data.message[0])
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
			<div className='flex flex-col rounded-[22px] justify-start bg-purple p-[25px] h-[600px] overflow-scroll'>
				{!data && 'Загрузка групп ...'}
				{data?.map((el: any) => (
					<div key={el.id}>
						<p
							className='text-[22px] py-[10px] px-[15px] cursor-pointer mb-[5px] rounded-[10px] transition-[0.3s] hover:bg-lightPurple hover:transition-[0.3s]'
							onClick={e => {
								e.preventDefault()
								props.setIsGroupOpen(true)
								props.setCurrentGroupId(el.id)
								props.setCurrentGroupName(el.name)
							}}
						>
							{el.name}
						</p>
						<hr className='border-t-2 border-solid border-t-white mb-[5px]' />
					</div>
				))}
			</div>
		</div>
	)
}

export default Groups
