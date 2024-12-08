'use client'

import AxiosInstance from '@/utils/axiosInstance'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'

type FormData = {
	login: string
	password: string
}

const LoginForm = () => {
	const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
	const [formData, setFormData] = useState<FormData>({} as FormData)
	const [error, setError] = useState<AxiosResponse | AxiosError | null>(null) // @TODO: maybe just message string?

	const router = useRouter()

	function submitLoginForm(e: any) {
		e.preventDefault()
		AxiosInstance.post('/auth/login', {
			login: formData.login.toLowerCase(),
			password: formData.password,
		})
			.then(res => {
				if (res.data.code != 200) {
					setError(res)
					toast.error(res.data.message, {
						position: 'bottom-center',
						autoClose: 5000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
						transition: Bounce,
					})
				} else {
					// res.data.role == 3 ? router.push('/admin') : router.push('/profile')
					switch (res.data.role) {
						case 1:
							router.push('/profile/student')
							break
						case 2:
							router.push('/profile/teacher')
							break
						case 3:
							router.push('/admin')
							break
					}
				}
			})
			.catch((err: AxiosError) => {
				console.log(err)
			})
	}

	function showPassword() {
		setIsPasswordShown(!isPasswordShown)
	}
	return (
		<>
			<div className='font-regular text-[80px] w-full flex justify-center items-center'>
				Авторизация
			</div>
			<form action='flex flex-col'>
				<label className='text-3xl ml-2.5' htmlFor='email__input'>
					Email
				</label>
				<input
					onInput={(e: any) => {
						setFormData({ ...formData, login: e.target.value })
					}}
					type='text'
					className='h-[90px] w-full text-3xl px-[30px] py-[26px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black placeholder:text-black'
					placeholder='examplelogin'
				/>
				<label className='text-3xl ml-2.5' htmlFor='password__input'>
					Пароль
				</label>
				<div className='c-password h-[90px] w-full text-3xl pr-[30px] py-[26px] mt-[10px] mb-[20px] rounded-[10px] text-black bg-white'>
					<input
						onInput={(e: any) => {
							setFormData({ ...formData, password: e.target.value })
						}}
						type={!isPasswordShown ? 'password' : 'text'}
						className='w-full h-[90px] rounded-[10px] pl-[30px] bg-inherit'
					/>
					<div
						className={
							!isPasswordShown ? 'c-password-eye' : 'c-password-eye_shown'
						}
						onClick={showPassword}
					></div>
				</div>
				<button
					onClick={e => {
						submitLoginForm(e)
					}}
					className='h-20 mt-[40px] w-full text-3xl bg-lightPurple rounded-[10px] transition-[0.5s] hover:transition-[0.5s] hover:brightness-[90%] active:brightness-[70%]'
				>
					Вход
				</button>
			</form>
			<ToastContainer />
		</>
	)
}

export default LoginForm
