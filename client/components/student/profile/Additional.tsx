import React from 'react'
import arrow from '/assets/arrow.png'
import Image from 'next/image'

const Additional = () => {
	return (
		<>
			{/* title bar */}
			<div className='flex w-full justify-center font-regular mb-[5px] text-[30px]'>
				Дополнительно
			</div>
			<div className='flex flex-col rounded-[22px] justify-start items-center bg-purple pt-[25px] min-h-[447px] pl-[25px]'>
				<div className='flex justify-start w-full flex-col'>
					<div className='text-[22px]'>
						<a href=''>Математика</a>
					</div>
					<div className='text-[22px]'>
						<a href=''>Математика</a>
					</div>
					<div className='text-[22px]'>
						<a href=''>Математика</a>
					</div>
				</div>
			</div>
		</>
	)
}

export default Additional
