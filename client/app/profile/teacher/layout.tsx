import Header from '@/components/header/Header'
import type { Metadata } from 'next'
import '../../globals.scss'

export const metadata: Metadata = {
	title: 'Профиль',
	description: 'Страница профиля пользователя',
}

export default function TopicLayout({
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
