'use client'

import { IGroup } from '@/types/models/IGroup'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import defaultAvatar from '/assets/avatar.png'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Select, { StylesConfig } from 'react-select'
import { Bounce, toast } from 'react-toastify'
import Modal from './Modal'
import { IUser } from '@/types/models/IUser'
import Image from 'next/image'
import { AVATARS_URL } from '@/constants'

interface ICreateModal {
   isModalOpen: boolean
   setModalOpen: Dispatch<SetStateAction<boolean>>
   update: boolean
   setUpdate: Dispatch<SetStateAction<boolean>>
   user: IUser
}

type FormState = Omit<IUser, 'photo'> & { password: string; photoFile: File } // doing photoFile separately to send it

const CreateUserModal = (props: ICreateModal) => {
   const [formState, setFormState] = useState<FormState>(props.user)
   const [error, setError] = useState<any>(null)
   const [groups, setGroups] = useState<any>(null)
   const [groupOptions, setGroupOptions] = useState<IGroup[]>([])
   const roleOptions = [
      { value: 1, label: 'Студент' },
      { value: 2, label: 'Преподаватель' },
   ]

   const selectStyles: StylesConfig = {
      control: styles => ({
         ...styles,
         backgroundColor: '#0a0019',
         border: 'none',
         fontSize: '15px',
      }),

      container: styles => ({
         ...styles,
         backgroundColor: '#0a0019',
         border: 'none',
         marginTop: '10px',
         marginBottom: '20px',
      }),

      option: styles => ({
         ...styles,
         backgroundColor: '#0a0019',
         border: 'none',
      }),

      menu: styles => ({
         ...styles,
         backgroundColor: '#0a0019',
         border: 'none',
         fontSize: '15px',
      }),

      placeholder: styles => ({
         ...styles,
         fontSize: '15px',
      }),
   }

   const router = useRouter()
   useEffect(() => {
      axiosInstance.get('/admin/getGroups').then(res => {
         console.log(res.data.message)
         setGroups(res.data.message)
         setGroupOptions(
            res.data.message.map((g: IGroup) => ({ value: g.id, label: g.name })),
         )
      })
   }, [])
   function submitUser(e: any) {
      e.preventDefault()
      console.log(formState)
      let formData = new FormData()
      formData.append('name', formState.name)
      formData.append('surname', formState.surname)
      formData.append('patronymic', formState.patronymic)
      formData.append('photo', formState.photoFile)
      formData.append('login', formState.login)
      // @TODO: validate empty password
      formData.append('password', formState.password)
      formData.append('role_id', formState.role_id.toString())
      formData.append('group_id', formState.group_id.toString())
      axiosInstance
         .post(`/admin/updateUser/${props.user.id}`, formData)
         .then(res => {
            props.setUpdate(!props.update)
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
               console.log(res)
            }
            props.setModalOpen(false)
         })
         .catch((err: AxiosError) => {
            console.log(err)
         })
      props.setModalOpen(false)
      props.setUpdate(!props.update)
   }
   return (
      <Modal isOpen={props.isModalOpen}>
         <div className='flex flex-col justify-between h-full'>
            <div>
               <h2 className='text-center text-[30px] mb-[15px]'>
                  Добавление пользователя
               </h2>
               <form action='flex flex-col'>
                  <label className='text-[25px] ml-2.5' htmlFor='title__input'>
                     Имя
                  </label>
                  <input
                     onInput={(e: any) => {
                        setFormState({ ...formState, name: e.target.value })
                     }}
                     type='text'
                     id='title__input'
                     maxLength={120}
                     defaultValue={props.user.name}
                     className='h-[60px] w-full text-[25px] px-[15px] py-[10px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black'
                     required
                  />

                  <label className='text-[25px] ml-2.5' htmlFor='descroption__input'>
                     Фамилия
                  </label>
                  <input
                     onInput={(e: any) => {
                        setFormState({ ...formState, surname: e.target.value })
                     }}
                     type='text'
                     id='descroption__input'
                     maxLength={500}
                     defaultValue={props.user.surname}
                     className='h-[60px] w-full text-[25px] px-[15px] py-[10px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black'
                     required
                  />

                  <label className='text-[25px] ml-2.5' htmlFor='descroption__input'>
                     Отчетсво
                  </label>
                  <input
                     onInput={(e: any) => {
                        setFormState({ ...formState, patronymic: e.target.value })
                     }}
                     type='text'
                     id='descroption__input'
                     maxLength={500}
                     defaultValue={props.user.patronymic}
                     className='h-[60px] w-full text-[25px] px-[15px] py-[10px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black'
                     required
                  />

                  <label className='text-[25px] ml-2.5' htmlFor='descroption__input'>
                     Логин
                  </label>
                  <input
                     onInput={(e: any) => {
                        setFormState({ ...formState, login: e.target.value })
                     }}
                     type='text'
                     id='descroption__input'
                     maxLength={500}
                     defaultValue={props.user.login}
                     className='h-[60px] w-full text-[25px] px-[15px] py-[10px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black'
                     required
                  />

                  <label className='text-[25px] ml-2.5' htmlFor='descroption__input'>
                     Пароль
                  </label>
                  <input
                     onInput={(e: any) => {
                        setFormState({ ...formState, password: e.target.value })
                     }}
                     type='password'
                     id='descroption__input'
                     maxLength={500}
                     className='h-[60px] w-full text-[25px] px-[15px] py-[10px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black'
                     required
                  />

                  <label className='text-[25px] ml-2.5' htmlFor='descroption__input'>
                     Группа
                  </label>
                  <Select
                     onChange={(e: any) => {
                        console.log(e)
                        setFormState({ ...formState, group_id: e.value })
                     }}
                     styles={selectStyles}
                     // @TODO: validate groups are loaded
                     defaultValue={groupOptions.length > 0 && groupOptions.find(
                        e => e.id === props.user.group_id,
                     )}
                     options={groupOptions}
                  />
                  <label className='text-[25px] ml-2.5' htmlFor='descroption__input'>
                     Роль
                  </label>
                  <Select
                     onChange={(e: any) => {
                        console.log(e)
                        setFormState({ ...formState, role_id: e.value })
                     }}
                     styles={selectStyles}
                     // @TODO: validate groups are loaded
                     defaultValue={roleOptions.find(
                        e => e.value === props.user.role_id,
                     )}
                     options={roleOptions}
                  />

                  <label className='text-[25px] ml-2.5' htmlFor='descroption__input'>
                     Фото
                  </label>
                  <div className='mt-[10px] mb-[20px]'>
                     <Image
                        src={
                           props.user.photo
                              ? AVATARS_URL + props.user.photo
                              : defaultAvatar
                        }
                        className='rounded-[10px]'
                        width={180}
                        height={180}
                        alt='avatar'
                     />
                  </div>
                  <label
                     htmlFor='photo__input'
                     className='block w-fit h-fit mt-[10px] mb-[20px] bg-lightPurple rounded-[22px] py-[14px] px-[35px] hover:bg-buttonsHover hover:transition-[0.3s] transition-[0.3s]'
                  >
                     <span className='text-[20px] font-regular'>
                        {formState.photoFile?.name || 'Выбрать фото'}
                     </span>
                  </label>
                  <input
                     id='photo__input'
                     type='file'
                     className='hidden'
                     accept='image/*'
                     onChange={e => {
                        setFormState({ ...formState, photoFile: e.target.files![0] })
                     }}
                  />
               </form>
            </div>
            <div className='self-end my-[25px] pb-[25px]'>
               <button
                  onClick={e => {
                     submitUser(e)
                  }}
                  className='bg-lightPurple rounded-[22px] py-[14px] px-[35px] mr-[15px] hover:bg-buttonsHover hover:transition-[0.3s] transition-[0.3s]'
               >
                  <span className='text-[20px] font-regular'>Сохранить</span>
               </button>
               <button
                  className='bg-lightPurple rounded-[22px] py-[14px] px-[35px] hover:bg-buttonsHover hover:transition-[0.3s] transition-[0.3s]'
                  onClick={() => props.setModalOpen(false)}
               >
                  <span className='text-[20px] font-regular'>Отменить</span>
               </button>
            </div>
         </div>
      </Modal>
   )
}

export default CreateUserModal
