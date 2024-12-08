'use client'

import Loading from '@/components/Loading'
import { isAdmin, isStudent, isTeacher } from '@/utils/roleChecker'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
	const router = useRouter()
	useEffect(() => {
		if (Cookies.get('user_id') == undefined) {
			router.push('/auth')
		} else {
			if (isStudent()) router.push('/profile/student')
			if (isTeacher()) router.push('/profile/teacher')
			if (isAdmin()) router.push('/admin')
		}
	}, [])
	return <Loading />
}
