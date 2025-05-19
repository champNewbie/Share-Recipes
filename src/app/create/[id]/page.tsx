'use client'
import React, { useState } from 'react'
import {Input} from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import axios from 'axios'
import { useRouter , useParams } from 'next/navigation'

const page = () => {
  const [menuName , setMenuName] = useState<string>('')
  const [describe , setDescribe] = useState<string>('')
  const params = useParams()
  const route = useRouter()
  const getData = async (e : any) => {
    e.preventDefault()
    try {
      const id = Number(params.id)
      await axios.post(`/api/menu/${id}`,{menuName , describe})
      alert('Share Successfully!')
      route.push(`/recipe/${id}`)
    } catch (error) {
      
    }
  }
  return (
    <div className='flex justify-center items-center my-auto h-screen'>
      <div className='border-3 rounded-xl border-black w-[25%] h-[48%] flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-bold'>
          Share-Recipe
        </h1>
        <form onSubmit={getData} className='mt-3 w-full flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-around items-start'>
              <h1 className='text-xl my-1'>
                Menu
              </h1>
              <Input placeholder='Menu' 
              className='w-90 my-1' 
              value={menuName} onChange={(e) => setMenuName(e.target.value)}/>
            </div>
            <div className='flex flex-col justify-around items-start mt-2'>
              <h1 className='text-xl my-1'>
                Details
              </h1>
              <Textarea placeholder='Menu'
              className='w-90 h-30' 
               value={describe} onChange={(e) => setDescribe(e.target.value)}/>
            </div>
            <Button type='submit' className='mt-10 px-10 py-5' >Share</Button>
        </form>
      </div>
    </div>
  )
}

export default page