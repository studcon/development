'use client'

import Image from 'next/image'
import { useState } from 'react'
import accept from '/assets/accept.svg'
import arrowRight from '/assets/arrow-right.png'
import arrow from '/assets/arrow.png'
import cancel from '/assets/cancel.svg'

const Additional = () => {
	const [isAddGroupOpen, setAddGroupOpen] = useState(false)
	return (
		<div className='relative'>
			{/* title bar */}
			<div className='flex w-full justify-center font-regular mb-[5px] text-[30px]'>
				Дополнительно
			</div>
			<div className='flex flex-col rounded-[22px_22px_0px_0px] justify-start items-center bg-purple p-[25px] h-[372px] overflow-scroll'>
				{/* subject title  */}
				<div className='flex justify-start items-center w-full'>
					<div className='mr-[30px]'>
						<Image src={arrow} width={26} height={32} alt='go back arrow' />
					</div>
					<div className='text-[22px]'>Математика</div>
				</div>
				{/* groups */}
				<div className='flex justity-start w-full flex-col text-[18px] mt-[10px]'>
					<p className='text-[20px] mb-[15px]'>Группа</p>
					<div>
						<div>
							<a
								className='flex justify-between items-center mb-[10px]'
								href=''
							>
								<p>ИСиП-401</p>
								<Image
									src={arrowRight}
									width={18}
									height={15}
									alt='go to page'
								/>
							</a>
						</div>
						<div>
							<a
								className='flex justify-between items-center mb-[10px]'
								href=''
							>
								<p>ИСиП-401</p>
								<Image
									src={arrowRight}
									width={18}
									height={15}
									alt='go to page'
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
			{isAddGroupOpen ? (
				<div className='flex justify-between bg-background absolute w-full h-[50px] left-0 bottom-[75px]'>
					<input
						type='text'
						className='px-[15px] h-full w-[230px] bg-background text-[18px] mr-[5px]'
						maxLength={30}
						placeholder='Введите группу'
					/>
					<div className='flex mr-[15px]'>
						<Image
							src={accept}
							width={30}
							height={30}
							alt='accept'
							className='mr-[10px] cursor-pointer'
						/>
						<Image
							src={cancel}
							width={30}
							height={30}
							alt='cancel'
							className='cursor-pointer'
							onClick={() => setAddGroupOpen(false)}
						/>
					</div>
				</div>
			) : (
				''
			)}

			<div
				className='flex justify-center items-center cursor-pointer bg-lightPurple transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] h-[75px] rounded-[0px_0px_22px_22px] text-[25px]'
				onClick={() => setAddGroupOpen(!isAddGroupOpen)}
			>
				Добавить
			</div>
		</div>
	)
}

export default Additional
