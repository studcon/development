import Header from '@/components/header/Header'
import type { Metadata } from 'next'
import '@/app/globals.scss'

export const metadata: Metadata = {
	title: 'Тема',
	description: 'Страница с темой предмета',
}

export default function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header />
			<div className='h-full w-screen flex flex-col text-white bg-background'>
				{children}
			</div>
		</>
	)
}
