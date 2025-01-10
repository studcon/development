'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import arrow from '/assets/arrow.png'
import Image from 'next/image'
import { AxiosError } from 'axios'
import axiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { ITopic } from '@/types/models/ITopic'
import { ILecture } from '@/types/models/ILecture'
import { ITest } from '@/types/models/ITest'
import { TMaterials } from '@/types/TMaterials'

type Props = {
   setIsSubjectOpen: Dispatch<SetStateAction<boolean>>
   currentSubjectId: number
}

const Subject = (props: Props) => {
   const [subject, setSubject] = useState<any>(null)
   const [topics, setTopics] = useState<any>(null)
   const [error, setError] = useState<AxiosError | null>(null)
   const [materials, setMaterials] = useState<TMaterials | null>(null)
   const [dropdownOpenIdx, setDropdownOpenIdx] = useState<number>(0) // non-zero means that some dropdown is opened

   function handleTopicsDropdown(e: React.MouseEvent, topicId: number) {
      // alert("handleTopicsDropdown called")
      dropdownOpenIdx == topicId ? setDropdownOpenIdx(0) : setDropdownOpenIdx(topicId)
      axiosInstance.get(`/topic/getMaterials/${topicId}`)
         .then(res => {
            console.log(res.data.message)
            setMaterials(res.data.message)
            console.log('getMaterials in subject')
            // alert('getMaterials in subject')
            console.log(materials)
         }).catch(err => console.log(err))
      console.log(materials)
   }

   useEffect(() => {
      // getSubject
      axiosInstance
         .get(`/user/getSubject/${props.currentSubjectId}`)
         .then(res => {
            console.log('currentSubjectId')
            console.log(props.currentSubjectId)

            console.log('subject')
            console.log(res.data.message)
            setSubject(res.data.message)
         })
         .catch((err: AxiosError) => {
            setError(err)
         })
      // getTopics
      axiosInstance
         .get(`/user/getTopics/${props.currentSubjectId}`)
         .then(res => {
            setTopics(res.data.message)
            console.log(res.data.message)
         })
         .catch((err: AxiosError) => {
            setError(err)
         })
   }, [])
   return (
      <div className='mb-[25px] w-[319px]'>
         {/* title bar */}
         <div className='flex w-full justify-center font-regular mb-[5px] text-[30px]'>
            Основное
         </div>
         <div className='flex flex-col rounded-[22px] justify-start items-center bg-purple p-[25px] min-h-[600px]'>
            {/* subject title  */}
            <div className='flex justify-start items-center w-full'>
               <div
                  onClick={e => {
                     e.preventDefault()
                     props.setIsSubjectOpen(false)
                  }}
                  className='mr-[30px]'
               >
                  <Image src={arrow} width={26} height={32} alt='go back arrow' />
               </div>
               <div className='text-[22px]'>{subject && subject.name}</div>
            </div>
            {/* themes */}
            <div className='flex justity-start w-full flex-col mt-[10px]'>
               {!topics && 'Загрузка...'}
               {topics &&
                  topics.map((topic: ITopic) => (
                     <div key={topic.id} >
                        <p onClick={(e) => handleTopicsDropdown(e, topic.id)} className='text-[22px] py-[10px] px-[15px] cursor-pointer mb-[5px] rounded-[10px] transition-[0.3s] hover:bg-lightPurple hover:transition-[0.3s]'>
                           {topic.title}
                        </p>
                        {dropdownOpenIdx == topic.id &&
                           <div>
                              {!materials && 'Загрузка...'}
                              {materials &&
                                 materials.lectures &&
                                 materials.lectures.map((lecture: ILecture, idx: number) => (
                                    <Link href={`/topic/${topic.id}/student?tab=${idx}`} key={lecture.id}>
                                       <div className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s]'>
                                          <p className='p-[10px] text-left text-[15px] w-full'>{lecture.title}</p>
                                       </div>
                                    </Link>
                                 ))}

                              {!materials && 'Загрузка...'}
                              {materials && materials.tests && materials.tests.map((test: ITest, idx: number) => (
                                 <Link href={`/topic/${topic.id}/student?tab=${idx}`} key={test.id}>
                                    <div className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s]'>
                                       <p className='p-[10px] text-left text-[15px] w-full'>{test.title}</p>
                                    </div>
                                 </Link>
                              ))}

                           </div>
                        }
                        <hr className='border-t-2 border-solid border-t-white mb-[5px]' />
                     </div>
                  ))}
            </div>
         </div>
      </div >
   )
}

export default Subject
