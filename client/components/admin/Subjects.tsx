'use client'

import { IGroup } from '@/types/models/IGroup'
import { ISubject } from '@/types/models/ISubject'
import axiosInstance from '@/utils/axiosInstance'
import { useEffect, useState } from 'react'
import CreateSubjectModal from '../modal/CreateSubjectModal'
import Subject from './Subject'

const Subjects = () => {
	const [data, setData] = useState<any>()
	const [groups, setGroups] = useState<IGroup[]>([])
	const [error, setError] = useState<any>()
	const [isModalCreateOpen, setModalCreateOpen] = useState(false)
	const [update, setUpdate] = useState<boolean>(false)
	useEffect(() => {
		// getGroups
		axiosInstance
			.get('/admin/getGroups')
			.then(res => {
				console.log(res.data.message)
				setGroups(res.data.message)
			})
			.catch(err => {
				console.log(err)
				setError(err)
			})
		// getSubjects
		axiosInstance
			.get('/admin/getSubjects')
			.then(res => {
				console.log(res.data.message)
				setData(res.data.message)
			})
			.catch(err => {
				console.log(err)
				setError(err)
			})
	}, [])

	// const selectStyles: StylesConfig = {
	// 	control: styles => ({
	// 		...styles,
	// 		backgroundColor: '#0a0019',
	// 		border: 'none',
	// 		fontSize: '15px',
	// 	}),

	// 	container: styles => ({
	// 		...styles,
	// 		backgroundColor: '#0a0019',
	// 		border: 'none',
	// 	}),

	// 	option: styles => ({
	// 		...styles,
	// 		backgroundColor: '#0a0019',
	// 		border: 'none',
	// 	}),

	// 	menu: styles => ({
	// 		...styles,
	// 		backgroundColor: '#0a0019',
	// 		border: 'none',
	// 		fontSize: '15px',
	// 	}),

	// 	placeholder: styles => ({
	// 		...styles,
	// 		fontSize: '15px',
	// 	}),
	// }
	// const options = [{ value: 'isip-401', label: 'ИСиП-401' }]
	// const searchRef = useRef<HTMLInputElement>(null)
	return (
		<div>
			{/* title div */}
			<div className='font-bold text-[23px] mb-[15px] flex justify-between items-center'>
				<div>
					<div>Учебные предметы</div>
				</div>
			</div>
			{/* content */}
			{/* @TODO: discuss <pre> */}
			<div>
				{!data && 'Загрузка предметов...'}
				{!groups && 'Загрузка групп... '}
				{data &&
					groups &&
					data.map((s: ISubject) => (
						<Subject
							group={groups.find(g => g.id === s.group_id)!}
							key={s.id}
							subject={s}
						/>
					))}
			</div>

			<div
				className='transition-[0.3s] hover:bg-buttonsHover absolute leading-[3px] right-[25px] bottom-[25px] bg-lightPurple w-[160px] h-[45px] flex justify-center items-center rounded-[22px] text-[15px] cursor-pointer'
				onClick={e => {
					e.preventDefault()
					setModalCreateOpen(true)
				}}
			>
				Добавить предмет
			</div>
			<CreateSubjectModal
				isModalOpen={isModalCreateOpen}
				setModalOpen={setModalCreateOpen}
				update={update}
				setUpdate={setUpdate}
			/>
		</div>
	)
}

export default Subjects
