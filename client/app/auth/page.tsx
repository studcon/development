import Image from 'next/image'
import Link from 'next/link'
import logo from '/assets/logo.png'

export default function Auth() {
	return (
		<>
			<header className='flex w-full justify-start items-center fixed left-0 top-[10px]'>
				<div>
					<Image src={logo} width={167} height={98} alt='logo' />
				</div>
			</header>
			<div className='max-w-[700px]'>
				<form action='flex flex-col'>
					<label className='text-3xl ml-2.5' htmlFor='email__input'>
						Email
					</label>
					<input
						type='email'
						className='h-[90px] w-full text-3xl px-[30px] py-[26px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black placeholder:text-black'
						placeholder='example@example.com'
					/>
					<label className='text-3xl ml-2.5' htmlFor='password__input'>
						Пароль
					</label>
					<input
						type='password'
						className='h-[90px] w-full text-3xl px-[30px] py-[26px] mt-[10px] rounded-[10px] text-black bg-white'
					/>
					<div className='text-right mx-0 my-[30px]'>
						<Link href={'#'} className='text-[25px]'>
							Регистрация
						</Link>
					</div>
					<button className='h-20 w-full text-3xl bg-lightPurple rounded-[10px] transition-[0.5s] hover:transition-[0.5s] hover:brightness-[90%] active:brightness-[70%]'>
						Вход
					</button>
				</form>
			</div>
		</>
	)
}
