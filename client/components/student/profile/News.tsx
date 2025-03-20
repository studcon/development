'use client'

import React, { useEffect, useRef, useState } from 'react'
import Post from './Post'
import axiosInstance from '@/utils/axiosInstance'
import { IPost } from '@/types/models/IPost'

const News = () => {
    const newsGlobalRef = useRef(null)
    const newsGroupRef = useRef(null)
    const [data, setData] = useState<any>()
    const [newsTypeRef, setNewsTypeRef] = useState<any>(newsGlobalRef)
    const [error, setError] = useState<any>()
    const groupId = 1
    useEffect(() => {
        console.log('newsTypeRef')
        console.log(newsTypeRef.current.id)
        if (newsTypeRef == newsGlobalRef) {
            // update tabs visuals
            newsGlobalRef.current.classList.add('bg-buttonsHover')
            newsGroupRef.current.classList.remove('bg-buttonsHover')

            axiosInstance
                .get('/user/getNews')
                .then(res => {
                    console.log(res.data.message)
                    setData(res.data.message)
                })
                .catch(err => {
                    console.log(err)
                    setError(err)
                })
        }
        else if (newsTypeRef == newsGroupRef) {
            // update tabs visuals
            newsGroupRef.current.classList.add('bg-buttonsHover')
            newsGlobalRef.current.classList.remove('bg-buttonsHover')
            axiosInstance
                .get(`user/getGroup`)
                .then(res => {
                    console.log('getGroup id')
                    console.log(res.data.message)
                    axiosInstance
                        .get(`admin/getNews/group/${res.data.message[0].id}`)
                        .then(res => {
                            console.log(res.data.message)
                            setData(res.data.message)
                        })
                        .catch(err => {
                            console.log(err)
                            setError(err)
                        })

                })
                .catch(err => {
                    console.log(err)
                    setError(err)
                })

        }
    }, [newsTypeRef])

    return (
        <div className='mb-[25px] w-[686px]'>
            {/* inner div */}
            <div className='flex w-full justify-center font-regular text-[30px] mb-[5px]'>
                Новости
            </div>
            <div className='flex flex-col rounded-[22px] justify-start items-start min-start h-[600px] bg-purple'>
                {/* news */}
                {/* NewsTabs */}
                <div className='flex w-full rounded-[22px] h-[15%] justify-center items-center bg-lightPurple'>
                    <div ref={newsGlobalRef} id="news__tabs__global" onClick={e => { setNewsTypeRef(newsGlobalRef) }} className="flex h-full justify-center items-center text-[30px] w-[50%] border-r-[2px] border-solid border-[white] hover:bg-buttonsHover transition-[0.3s]">
                        Общие
                    </div>
                    <div ref={newsGroupRef} id="news__tabs__group" onClick={e => { setNewsTypeRef(newsGroupRef) }} className="flex h-full justify-center items-center text-[30px] w-[50%] hover:bg-buttonsHover transition-[0.3s]">
                        Группа
                    </div>
                </div>
                {/* NewsTabs */}
                <div id='student__news' className='w-full overflow-y-auto m-[25px]'>
                    {!data && 'Загрузка...'}
                    {data && data.map((p: IPost) => <Post key={p.id} post={p} />)}
                </div>
            </div>
        </div >
    )
}

export default News
