import Image from 'next/image'
import Link from 'next/link'
import arrow from '/assets/arrow.png'
import Projects from '@/components/teacher/portfolio/Projects'

const Portfolio = () => {
	return (
		<div className='w-[1080px] h-screen p-[25px] mx-auto'>
			{/* title */}
			<div className='mb-[25px] flex items-center'>
				<div className='mr-[15px]'>
					<Link href={'/profile'}>
						<Image src={arrow} width={26} height={32} alt='go back arrow' />
					</Link>
				</div>
				<div className='text-[35px]'>Портфолио</div>
			</div>
			<Projects />
		</div>
	)
}

export default Portfolio
