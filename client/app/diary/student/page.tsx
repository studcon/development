import React, { Suspense } from 'react'
import Loading from '@/components/Loading'
import DiaryPageComponent from '@/components/diary/student/DiaryPageComponent'

const DairyPage = () => {
	return (
		<Suspense fallback={<Loading />}>
			{/* it is necessary to build component with `useSearchParams()`*/}
			<DiaryPageComponent />
		</Suspense>
	)
}

export default DairyPage
