'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ILecture } from '@/types/models/ILecture'
import { ITest } from '@/types/models/ITest'
import axiosInstance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import arrow from '/assets/arrow.png'
import Lection from '@/components/teacher/topic/Lection'
import Test from '@/components/teacher/topic/Test'
import LectionEditor from '@/components/teacher/topic/LectionEditor'
import TestEditor from '@/components/teacher/topic/TestEditor'
import BreadCrumps from '@/components/BreadCrumps'

const Topic = () => {
   const [isLectionCreateOpen, setLectionCreateOpen] = useState<boolean>(false)
   const [isLectionUpdateOpen, setLectionUpdateOpen] = useState<boolean>(false)
   const [lectionUpdate, setLectionUpdate] = useState(null)
   const [isTestCreateOpen, setTestCreateOpen] = useState<boolean>(false)
   const [isTestUpdateOpen, setTestUpdateOpen] = useState<boolean>(false)
   const [testUpdateId, setTestUpdateId] = useState<number>(0)
   const [topic, setTopic] = useState<any>(null)
   const [error, setError] = useState<AxiosError | null>(null)
   const [tabs, setTabs] = useState<React.JSX.Element[]>([])

   const router = useRouter()
   const params = useParams()

   const getMaterials = () => {
      console.log('get')

      axiosInstance
         .get(`/topic/getMaterials/${params.id}`)
         .then(res => {
            setTopic(res.data.message)
            setTabs([])
            console.log(res.data.message)
            res.data.message.lectures.forEach((lecture: ILecture) => {
               setTabs(tabs => [
                  ...tabs,
                  <Lection
                     lecture={lecture}
                     SetLectionUpdateOpen={setLectionUpdateOpen}
                     setLectionUpdate={setLectionUpdate}
                     isTest={false}
                     getMaterials={getMaterials}
                  />,
               ])
            })
            res.data.message.tests.forEach((test: ITest) => {
               setTabs(tabs => [
                  ...tabs,
                  <Test setTestUpdateId={setTestUpdateId} getMaterials={getMaterials} test={test} isTest={true} isTestUpdateOpen={isTestUpdateOpen} setTestUpdateOpen={setTestUpdateOpen} />,
               ])
            })
         })
         .catch((err: AxiosError) => {
            setError(err)
         })
      // getTopic
      axiosInstance
         .get(`/topic/getTopic/${params.id}`)
         .then(res => {
            setTopic(res.data.message)
            console.log(res.data.message)
         })
         .catch((err: AxiosError) => {
            setError(err)
         })
   }

   useEffect(() => {
      // getMaterials
      getMaterials()
      // getTopic
      axiosInstance
         .get(`/topic/getTopic/${params.id}`)
         .then(res => {
            setTopic(res.data.message)
            console.log(res.data.message)
         })
         .catch((err: AxiosError) => {
            setError(err)
         })
   }, [])

   const [isAddOpen, setAddOpen] = useState(false)
   const [selectedTab, setSelectedTab] = useState<number>(0)
   return (
      <div className='h-screen w-[1080px] mx-auto'>
         <div className='p-[25px]'>
            {/* title */}
            <div className='mb-[25px] flex items-center'>
               <div className='mr-[15px]'>
                  <Link href={'/profile'}>
                     <Image
                        src={arrow}
                        width={26}
                        height={32}
                        alt='go back arrow'
                        className='cursor-pointer transition-[0.3s] hover:brightness-75 hover:transition-[0.3s]'
                        onClick={() => router.push('profile')}
                     />
                  </Link>
               </div>
               <div className='text-[35px]'>
                  {topic ? topic.title : 'Загрузка...'}
               </div>
            </div>
            <BreadCrumps tab={tabs[selectedTab]} />
            <div className='flex'>
               {/* left */}
               <div className='flex flex-col relative mr-[25px]'>
                  <div className='p-[25px] w-[320px] h-[725px] bg-purple rounded-[22px_22px_0px_0px]'>
                     <div className='*:mb-[5px]'>
                        {tabs.map((tab: React.JSX.Element, index: number) => (
                           <div
                              key={index}
                              className='hover:bg-buttonsHover rounded-[10px] transition-[0.3s] cursor-pointer'
                              onClick={e => {
                                 e.preventDefault()
                                 console.log(tabs)

                                 setSelectedTab(index)
                              }}
                           >
                              <div className='p-[10px] text-[15px]'>
                                 {!tab.props.isTest
                                    ? tab.props.lecture.title
                                    : 'Тест: ' + tab.props.test.title}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  {isAddOpen ? (
                     <div className='flex justify-between items-center bg-background absolute w-full h-[50px] text-[15px] left-0 bottom-[75px]'>
                        <div
                           className='h-full flex items-center justify-center w-full transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] cursor-pointer'
                           onClick={() => {
                              setLectionCreateOpen(true)
                              setAddOpen(false)
                           }}
                        >
                           Лекция
                        </div>
                        <span className='border-l-[2px] border-solid border-t-white h-full'></span>
                        <div
                           className='flex items-center justify-center h-full w-full transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] cursor-pointer'
                           onClick={() => {
                              setTestCreateOpen(true)
                              setAddOpen(false)
                           }}
                        >
                           Тест
                        </div>
                     </div>
                  ) : (
                     ''
                  )}
                  <div
                     className='flex justify-center items-center cursor-pointer w-full bg-lightPurple transition-[0.3s] hover:bg-buttonsHover hover:transition-[0.3s] h-[75px] rounded-[0px_0px_22px_22px] text-[25px]'
                     onClick={() => setAddOpen(!isAddOpen)}
                  >
                     Добавить
                  </div>
               </div>
               {/* right */}
               <div className='w-[685px] relative p-[25px] h-[800px] bg-purple rounded-[22px]'>
                  {isLectionUpdateOpen ? (
                     <LectionEditor
                        setLectionUpdateOpen={setLectionUpdateOpen}
                        setLectionCreateOpen={setLectionCreateOpen}
                        update={true}
                        lecture={lectionUpdate!}
                        topic_id={+params.id}
                        getMaterials={getMaterials}
                     />
                  ) : isLectionCreateOpen ? (
                     <LectionEditor
                        setLectionUpdateOpen={setLectionUpdateOpen}
                        setLectionCreateOpen={setLectionCreateOpen}
                        update={false}
                        topic_id={+params.id}
                        getMaterials={getMaterials}
                     />
                  ) : isTestCreateOpen ? (
                     <TestEditor
                        test_id={0}
                        topic_id={+params.id}
                        setTestCreateOpen={setTestCreateOpen}
                        setTestUpdateOpen={setTestUpdateOpen}
                        getMaterials={getMaterials}
                     />
                  ) :
                     isTestUpdateOpen ? (
                        <TestEditor
                           test_id={testUpdateId}
                           topic_id={+params.id}
                           setTestCreateOpen={setTestCreateOpen}
                           setTestUpdateOpen={setTestUpdateOpen}
                           getMaterials={getMaterials}

                        />
                     )
                        : (
                           tabs[selectedTab]
                        )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Topic
