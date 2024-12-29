import ContextMenu from '@/components/ContextMenu'
import UpdateProjectModal from '@/components/modal/UpdateProjectModal'
import { PROJECTS_URL } from '@/constants'
import { IProject } from '@/types/models/IProject'
import Image from 'next/image'
import defautImage from '@/assets/defaultImage.png'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
	resetIndicator: boolean
	setResetIndicator: Dispatch<SetStateAction<boolean>>
	update: boolean
	setUpdate: Dispatch<SetStateAction<boolean>>
	project: IProject
}
const Project = (props: Props) => {
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
	const [clicked, setIsClicked] = useState<boolean>(false)
	const [points, setPoints] = useState({
		x: 0,
		y: 0,
	})

	useEffect(() => {
		const handleClick = () => setIsClicked(false)
		window.addEventListener('click', handleClick)
		console.log(props.project.image)
		return () => {
			window.removeEventListener('click', handleClick)
		}
	}, [])
	return (
		<div
			className='mb-[25px] relative w-full flex justify-between rounded-[22px] bg-purple p-[20px]'
			onContextMenu={e => {
				e.preventDefault()
				setIsClicked(true)
				setPoints({
					x: e.clientX,
					y: e.clientY,
				})
			}}
		>
			{clicked && (
				<ContextMenu
					resetIndicator={props.resetIndicator}
					setResetIndicator={props.setResetIndicator}
					projectId={props.project.id}
					points={points}
					setModalOpen={setIsUpdateModalOpen}
				/>
			)}
			<div className='max-w-[835px]'>
				<h2 className='text-[23px] mb-[10px]'>{props.project.title}</h2>
				<p className='text-[15px] mb-[10px]'>{props.project.description}</p>
				{props.project.image && (
					<div>
						<Image
							className='rounded-[10px]'
							src={PROJECTS_URL + props.project.image}
							width={100}
							height={100}
							alt={props.project.title + ' image'}
						/>
					</div>
				)}
			</div>
			<div className='flex items-end'>
				<a
					className='bg-lightPurple hover:bg-buttonsHover hover:transition-[0.3s] transition-[0.3s] rounded-[22px] py-[10px] px-[35px]'
					href={props.project.url}
					target='_blank'
				>
					<span className='text-[15px] font-regular'>Перейти</span>
				</a>
			</div>
			<UpdateProjectModal
				isModalOpen={isUpdateModalOpen}
				setModalOpen={setIsUpdateModalOpen}
				projectId={props.project.id}
				update={props.update}
				setUpdate={props.setUpdate}
			/>
		</div>
	)
}

export default Project
