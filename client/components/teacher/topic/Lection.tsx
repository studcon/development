'use client'
import { ILecture } from '@/types/models/ILecture'
import axiosInstance from '@/utils/axiosInstance'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
	lecture: ILecture
	isTest: boolean
	SetLectionUpdateOpen: Dispatch<SetStateAction<boolean>>
	setLectionUpdate: any
	getMaterials: () => void
}

const Lection = (props: IProps) => {
	const deleteLecture = () => {
		axiosInstance.delete(`/topic/deleteLecture/${props.lecture.id}`)
		props.getMaterials()
	}
	return (
		<div className='flex flex-col justify-between h-full'>
			<div>
				<div className='font-bold text-[23px] mb-[15px] w-full bg-purple outline-none'>
					{props.lecture.title}
				</div>
				<div className='text-wrap h-[630px]'>
					<div className='resize-none bg-purple w-full h-full outline-none overflow-y-auto'>
						{props.lecture.content}
					</div>
				</div>
			</div>
			<div className='flex leading-[3px] text-[15px] self-end mt-[25px]'>
				<button
					className=' bg-lightPurple transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] w-[145px] h-[45px] flex justify-center items-center rounded-[22px] mr-[10px]	'
					onClick={() => {
						props.SetLectionUpdateOpen(true)
						props.setLectionUpdate(props.lecture)
					}}
				>
					Редактировать
				</button>
				<button
					className=' bg-lightPurple transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] w-[130px] h-[45px] flex justify-center items-center rounded-[22px]'
					onClick={() => deleteLecture()}
				>
					Удалить
				</button>
			</div>
		</div>
	)
}

export default Lection
