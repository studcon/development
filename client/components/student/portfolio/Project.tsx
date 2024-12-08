import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ContextMenu from '../ContextMenu'
import UpdateProjectModal from '../modal/UpdateProjectModal'

interface IProject {
	id: number
	title: string
	description: string
	url: string
	update: boolean
	setUpdate: Dispatch<SetStateAction<boolean>>
}
type AddProps = {
	resetIndicator: boolean
	setResetIndicator: Dispatch<SetStateAction<boolean>>
}
const Project = (props: IProject & AddProps) => {
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
	const [clicked, setIsClicked] = useState<boolean>(false)
	const [points, setPoints] = useState({
		x: 0,
		y: 0,
	})

	useEffect(() => {
		const handleClick = () => setIsClicked(false)
		window.addEventListener('click', handleClick)
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
					projectId={props.id}
					points={points}
					setModalOpen={setIsUpdateModalOpen}
				/>
			)}
			<div className='max-w-[835px]'>
				<h2 className='text-[23px] mb-[10px]'>{props.title}</h2>
				<p className='text-[15px]'>{props.description}</p>
			</div>
			<div className='flex items-end'>
				<a
					className='bg-lightPurple hover:bg-buttonsHover hover:transition-[0.3s] transition-[0.3s] rounded-[22px] py-[10px] px-[35px]'
					href={props.url}
					target='_blank'
				>
					<span className='text-[15px] font-regular'>Перейти</span>
				</a>
			</div>
			<UpdateProjectModal
				isModalOpen={isUpdateModalOpen}
				setModalOpen={setIsUpdateModalOpen}
				projectId={props.id}
				update={props.update}
				setUpdate={props.setUpdate}
			/>
		</div>
	)
}

export default Project
