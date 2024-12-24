'use client'

import Image from 'next/image'
import { useState } from 'react'

import Groups from '@/components/admin/Groups'
import News from '@/components/admin/News'
import Subjects from '@/components/admin/Subjects'
import Users from '@/components/admin/Users'
import arrow from '/assets/arrow.png'

const Admin = () => {
	const tabs = [<Users />, <Groups />, <Subjects />, <News />]
	const [selectedTab, setSelectedTab] = useState<number>(0)
	return (
		<div className='h-screen w-[1080px] mx-auto'>
			<div className='p-[25px]'>
				{/* title */}
				<div className='mb-[25px] flex items-center'>
					<div className='mr-[15px]'>
						<Image src={arrow} width={26} height={32} alt='go back arrow' />
					</div>
					<div className='text-[35px]'>Панель администратора</div>
				</div>
				<div className='flex items-center'>
					{/* left */}
					<div className='p-[25px] w-[250px] h-[600px] bg-purple rounded-[22px] mr-[25px]'>
						<div className='*:mb-[2px] last:mb-0'>
							<div
								className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s] cursor-pointer'
								onClick={e => {
									e.preventDefault()
									setSelectedTab(0)
								}}
							>
								<button className='p-[10px] text-[15px]'>Пользователи</button>
							</div>
							<div
								className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s] cursor-pointer'
								onClick={e => {
									e.preventDefault()
									setSelectedTab(1)
								}}
							>
								<button className='p-[10px] text-[15px]'>Группы</button>
							</div>
							<div
								className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s] cursor-pointer'
								onClick={e => {
									e.preventDefault()
									setSelectedTab(2)
								}}
							>
								<button className='p-[10px] text-[15px]'>
									Учебные предметы
								</button>
							</div>
							<div
								className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s] cursor-pointer'
								onClick={e => {
									e.preventDefault()
									setSelectedTab(3)
								}}
							>
								<button className='p-[10px] text-[15px]'>Новости</button>
							</div>
						</div>
					</div>

					{/* right */}
					<div className='w-[755px] relative p-[25px] h-[600px] bg-purple rounded-[22px]'>
						{tabs[selectedTab]}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Admin
