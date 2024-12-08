'use client'
import { ILecture } from '@/types/models/ILecture'
import axiosInstance from '@/utils/axiosInstance'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IProps {
	lecture?: ILecture
	update: boolean
	topic_id?: number
	setLectionCreateOpen: Dispatch<SetStateAction<boolean>>
	setLectionUpdateOpen: Dispatch<SetStateAction<boolean>>
	getMaterials: () => void
}

const LectionEditor = (props: IProps) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	useEffect(() => {
		if (props.update == true) {
			setTitle(props.lecture!.title)
			setContent(props.lecture!.content)
		}
	}, [])

	const updateLection = () => {
		if (title != '' && content != '') {
			axiosInstance.put(`/topic/updateLecture/${props.lecture!.id}`, {
				title: title,
				content: content,
			})
			props.getMaterials()
			props.setLectionUpdateOpen(false)
		}
	}

	const addLection = () => {
		if (title != '' && content != '') {
			axiosInstance.post(`/topic/addLecture`, {
				title: title,
				content: content,
				topic_id: props.topic_id,
			})
			props.getMaterials()
			props.setLectionCreateOpen(false)
		}
	}

	return (
		<div className='flex flex-col justify-between h-full'>
			<div>
				<input
					className='font-bold text-[23px] mb-[15px] w-full bg-purple outline-none'
					value={title}
					onChange={e => setTitle(e.currentTarget.value)}
					placeholder='Введите название лекции'
				/>
				<div className='text-wrap h-[630px]'>
					<textarea
						className='resize-none bg-purple w-full h-full outline-none overflow-y-auto'
						placeholder='Введите лекцию'
						value={content}
						onChange={e => setContent(e.currentTarget.value)}
					/>
				</div>
			</div>
			<div className='flex leading-[3px] text-[15px] self-end mt-[25px]'>
				<button
					className='bg-lightPurple transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] w-[130px] h-[45px] flex justify-center items-center rounded-[22px] mr-[10px]'
					onClick={() => (props.update ? updateLection() : addLection())}
				>
					Сохранить
				</button>
				<button
					className=' bg-lightPurple transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] w-[130px] h-[45px] flex justify-center items-center rounded-[22px]'
					onClick={() =>
						props.update
							? props.setLectionUpdateOpen(false)
							: props.setLectionCreateOpen(false)
					}
				>
					Отмена
				</button>
			</div>
		</div>
	)
}

export default LectionEditor
