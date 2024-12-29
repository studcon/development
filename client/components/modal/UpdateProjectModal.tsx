'use client'

import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import defaultImage from '@/assets/defaultImage.png'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import Modal from './Modal'
import Image from 'next/image'
import { IProject } from '@/types/models/IProject'
import { AVATARS_URL, PROJECTS_URL } from '@/constants'

interface IUpdateProjectModal {
   isModalOpen: boolean
   setModalOpen: Dispatch<SetStateAction<boolean>>
   projectId: number
   update: boolean
   setUpdate: Dispatch<SetStateAction<boolean>>
}

type FormState = Omit<IProject, 'id' | 'image'> & { imageFile: File }

const UpdateProjectModal = (props: IUpdateProjectModal) => {
   const [formState, setFormState] = useState<FormState>({} as FormState)
   const [projectData, setProjectData] = useState<IProject>({} as IProject)
   const [error, setError] = useState<any>(null)
   const router = useRouter()

   useEffect(() => {
      axiosInstance.get(`/project/getOne/${props.projectId}`).then(res => {
         setProjectData(res.data)
         console.log(projectData)
      })
   }, [props.update])
   function submitProject(e: any) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', formState.title)
      formData.append('description', formState.description)
      formData.append('url', formState.url)
      formData.append('image', formState.imageFile)
      formData.append('user_id', Cookies.get('user_id')!)
      axiosInstance
         .post(`/project/updateProject/${props.projectId}`, formData)
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
            }
         })
         .catch((err: AxiosError) => {
            console.log(err)
         })

      props.setModalOpen(false)
   }
   return (
      <Modal isOpen={props.isModalOpen}>
         <div className='flex flex-col justify-between h-full'>
            <div>
               <h2 className='text-center text-[30px] mb-[15px]'>
                  Изменение проекта
               </h2>
               <form action='flex flex-col'>
                  <label className='text-[25px] ml-2.5' htmlFor='title__input'>
                     Название проекта
                  </label>
                  <input
                     defaultValue={projectData && projectData.title}
                     onInput={(e: any) => {
                        setFormState({ ...formState, title: e.target.value })
                     }}
                     type='text'
                     id='title__input'
                     maxLength={120}
                     className='h-[60px] w-full text-[25px] px-[15px] py-[10px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black'
                     required
                  />

                  <label className='text-[25px] ml-2.5' htmlFor='descroption__input'>
                     Описание проекта
                  </label>
                  <input
                     defaultValue={projectData && projectData.description}
                     onInput={(e: any) => {
                        setFormState({ ...formState, description: e.target.value })
                     }}
                     type='text'
                     id='descroption__input'
                     maxLength={500}
                     className='h-[60px] w-full text-[25px] px-[15px] py-[10px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black'
                     required
                  />
                  <label className='text-[25px] ml-2.5' htmlFor='description__input'>
                     Ссылка на проект
                  </label>
                  <input
                     defaultValue={projectData && projectData.url}
                     onInput={(e: any) => {
                        setFormState({ ...formState, url: e.target.value })
                     }}
                     type='text'
                     id='description__input'
                     maxLength={300}
                     className='h-[60px] w-full text-[25px] px-[15px] py-[10px] mt-[10px] mb-[20px] rounded-[10px] bg-white text-black'
                     required
                  />

                  <label className='text-[25px] ml-2.5' htmlFor='descroption__input'>
                     Изображение
                  </label>

                  <div className='mt-[10px] mb-[20px]'>
                     <Image
                        src={
                           formState.imageFile ? URL.createObjectURL(formState.imageFile) : projectData.image ? PROJECTS_URL + projectData.image : defaultImage
                        }
                        className='rounded-[10px]'
                        width={180}
                        height={180}
                        alt={projectData.title}
                     />
                  </div>
                  <label
                     htmlFor='photo__input'
                     className='block w-fit h-fit mt-[10px] mb-[20px] bg-lightPurple rounded-[22px] py-[14px] px-[35px] hover:bg-buttonsHover hover:transition-[0.3s] transition-[0.3s]'
                  >
                     <span className='text-[20px] font-regular'>
                        {formState.imageFile?.name || 'Выбрать картинку'}
                     </span>
                  </label>
                  <input
                     id='photo__input'
                     type='file'
                     className='hidden'
                     accept='image/*'
                     onChange={e => {
                        setFormState({ ...formState, imageFile: e.target.files![0] })
                     }}
                  />
               </form>
            </div>
            <div className='self-end'>
               <button
                  onClick={e => {
                     submitProject(e)
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

export default UpdateProjectModal
