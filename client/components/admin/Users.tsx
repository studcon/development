'use client'

import { useEffect, useRef, useState } from 'react'

import { IGroup } from '@/types/models/IGroup'
import { IUser } from '@/types/models/IUser'
import axiosInstance from '@/utils/axiosInstance'
import CreateUserModal from '../modal/CreateUserModal'
import User from './User'

const Users = () => {
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
		// getUsers
		axiosInstance
			.get('/admin/getUsers')
			.then(res => {
				console.log(res.data.message)
				setData(res.data.message)
			})
			.catch(err => {
				console.log(err)
				setError(err)
			})
	}, [])

	const searchRef = useRef<HTMLInputElement>(null)
	return (
		<div>
			{/* title div */}
			<div className='font-bold text-[23px] mb-[15px] flex justify-between items-center'>
				<div>
					<div>Пользователи</div>
				</div>
			</div>
			{/* content */}
			<div>
				{!data && 'Загрузка...'}
				{!groups && 'Загрузка...'}
				{data &&
					groups &&
					data.map((u: IUser) => (
						<User
							group={groups.find(g => g.id === u.group_id)!}
							key={u.id}
							user={u}
						/>
					))}
			</div>

			<div
				onClick={e => {
					e.preventDefault()
					setModalCreateOpen(true)
				}}
				className='transition-[0.3s] hover:bg-buttonsHover absolute leading-[3px] right-[25px] bottom-[25px] bg-lightPurple h-[45px] flex justify-center items-center rounded-[22px] text-[15px] px-[10px] py-[15px] cursor-pointer'
			>
				Добавить пользователя
			</div>
			<CreateUserModal
				isModalOpen={isModalCreateOpen}
				setModalOpen={setModalCreateOpen}
				update={update}
				setUpdate={setUpdate}
			/>
		</div>
	)
}

export default Users
