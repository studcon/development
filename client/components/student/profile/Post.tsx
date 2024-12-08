import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import arrowRight from '/assets/arrow-right.png'
import { IPost } from '@/types/models/IPost'

type Props = {
	post: IPost
}

const Post = (props: Props) => {
	return (
		<div className='w-full flex flex-col'>
			{/* title */}
			<div className='mb-[10px] text-[23px]'>{props.post.title}</div>
			{/* content */}
			<div className='flex flex-wrap max-w-[636px] h-full'>
				{props.post.content}
			</div>
			<div className='mt-[10px] w-full flex justify-end'>
				{/* <Link className='bg-lightPurple rounded-[22px] p-[10px]' href={'/'}> */}
				{/* 	<span className='mr-[5px] font-regular'>Читать далее</span> */}
				{/* 	<span> */}
				{/* 		<Image */}
				{/* 			className='inline' */}
				{/* 			src={arrowRight} */}
				{/* 			width={14} */}
				{/* 			height={14} */}
				{/* 			alt='arrow' */}
				{/* 		/> */}
				{/* 	</span> */}
				{/* </Link> */}
			</div>
		</div>
	)
}

export default Post
