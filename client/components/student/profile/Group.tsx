import Image from 'next/image'
import React from 'react'

import avatar from '/assets/avatar.png'

const Group = () => {
	return (
		<div className='flex items-center bg-lightPurple w-full rounded-[15px] p-[7px] mb-[20px]'>
			{/* logo */}
			<div className='mr-[10px] min-w-[75px] min-h-[75px] h-full flex items-start'>
				<Image
					className='rounded-[15px]'
					src={avatar}
					width={75}
					height={75}
					alt='group avatar'
				/>
			</div>
			{/* title and content */}
			<div className='ml-[15px]'>
				<div className='text-[22px]'>title</div>
			</div>
		</div>
	)
}

export default Group
