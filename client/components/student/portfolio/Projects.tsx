'use client'

import { useEffect, useState } from 'react'
import Project from './Project'
import CreateProjectModal from '../modal/CreateProjectModal'
import { AxiosError } from 'axios'
import axiosInstance from '@/utils/axiosInstance'

const Projects = () => {
	const [isModalCreateOpen, setModalCreateOpen] = useState(false)
	const [update, setUpdate] = useState<boolean>(false)
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	const [resetIndicator, setResetIndicator] = useState<boolean>(false)
	useEffect(() => {
		axiosInstance
			.get('/project/getAll')
			.then(res => {
				console.log(res.data)
				setData(res.data)
			})
			.catch(err => {
				console.log(err)
				setError(err)
			})
	}, [isModalCreateOpen, resetIndicator, update])
	return (
		<>
			<div className='mb-[25px] w-full'>
				{/* inner div */}
				<div className='flex w-full justify-between items-center font-regular mb-[20px]'>
					<h2 className='text-[30px] leading-[60px]'>Мои проекты</h2>
					<div className='flex items-center'>
						<button
							className='bg-lightPurple rounded-[22px] py-[14px] px-[35px] hover:bg-purple hover:transition-[0.3s] transition-[0.3s]'
							onClick={() => setModalCreateOpen(true)}
						>
							<span className='text-[20px] font-regular'>Добавить</span>
						</button>
					</div>
				</div>
				<div>
					{!data && 'Загрузка...'}
					{data &&
						data.map((p: any) => (
							<Project
								key={p.id}
								id={p.id}
								title={p.title}
								description={p.description}
								url={p.url}
								resetIndicator={resetIndicator}
								setResetIndicator={setResetIndicator}
								setUpdate={setUpdate}
								update={update}
							/>
						))}
				</div>
			</div>
			<CreateProjectModal
				update={update}
				setUpdate={setUpdate}
				isModalOpen={isModalCreateOpen}
				setModalOpen={setModalCreateOpen}
			/>
		</>
	)
}

export default Projects
