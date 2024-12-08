import Group from './Group'

const Teachers = () => {
	return (
		<>
			{/* title bar */}
			<div className='flex w-full justify-center font-regular mb-[5px] text-[30px]'>
				Мои группы
			</div>
			<div className='flex flex-col rounded-[22px] px-[25px] justify-start items-start min-start h-[447px] bg-purple'>
				<div className='w-full overflow-y-auto my-[25px]'>
					<Group />
					<Group />
					<Group />
				</div>
			</div>
		</>
	)
}

export default Teachers
