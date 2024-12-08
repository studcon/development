'use client'

import Loading from '@/components/Loading'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
	const router = useRouter()
	useEffect(() => {
		if (Cookies.get('user_id') == undefined) {
			router.push('/auth')
		} else {
			if (Number(Cookies.get('role')!) == 3) router.push('/admin')
			router.push('/profile')
		}
	}, [])
	return <Loading />
}
