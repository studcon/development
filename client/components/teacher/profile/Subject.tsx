import Image from 'next/image'
import arrowRight from '/assets/arrow-right.png'
import arrow from '/assets/arrow.png'

const Subject = () => {
	return (
		<div className='mb-[25px] w-[319px]'>
			{/* title bar */}
			<div className='flex w-full justify-center font-regular mb-[5px] text-[30px]'>
				Основное
			</div>
			<div className='flex flex-col rounded-[22px] justify-start items-center bg-purple p-[25px] h-[447px] overflow-scroll'>
				{/* subject title  */}
				<div className='flex justify-start items-center w-full'>
					<div className='mr-[30px]'>
						<Image src={arrow} width={26} height={32} alt='go back arrow' />
					</div>
					<div className='text-[22px]'>Математика</div>
				</div>
				{/* groups */}
				<div className='flex justity-start w-full flex-col text-[18px] mt-[10px]'>
					<p className='text-[20px] mb-[15px]'>Группа</p>
					<div>
						<div>
							<a
								className='flex justify-between items-center mb-[10px]'
								href=''
							>
								<p>ИСиП-401</p>
								<Image
									src={arrowRight}
									width={18}
									height={15}
									alt='go to page'
								/>
							</a>
						</div>
						<div>
							<a
								className='flex justify-between items-center mb-[10px]'
								href=''
							>
								<p>ИСиП-401</p>
								<Image
									src={arrowRight}
									width={18}
									height={15}
									alt='go to page'
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Subject
