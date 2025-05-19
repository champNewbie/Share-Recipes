'use client'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

const page = () => {
  const [name , setName] = useState<string>('')
  const [describe , setDescribe] = useState<string>('')
  const [userId , setUserId] = useState<number>(0)
  const params = useParams()
  const route = useRouter()
  const getData =async () => {
    const id = Number(params.id)
    try {
        const menu = await axios.get(`/api/edit/${id}`)
        const response = await menu.data
        let formattedData = [];
        if (Array.isArray(response)) {
        formattedData = response;
        } else {
        formattedData = [response];
        }
        // ตั้งชื่อและคำอธิบายจากข้อมูลแรก (ถ้ามี)
        if (formattedData.length > 0) {
            setName(formattedData[0].menuName);
            setDescribe(formattedData[0].describe);
            setUserId(formattedData[0].userId)
        }
    } catch (error) {
        console.log('error' , error)
    }
  }
  const fetchData = async (e : any) => {
    const id = Number(params.id)
    e.preventDefault()
    try {
        await axios.put(`/api/edit/${id}` , {name , describe})
        alert('Edit Successfully')
        route.push(`/recipe/${userId}`)
    } catch (error) {
        
    }
  }
  useEffect(() => {
    getData()
  },[])

  return (
    <div className='flex justify-center h-screen items-center'>
        <Card className='w-[50%]'>
        <CardHeader>
            <CardTitle>Edit Detail</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Menu Name</p>
            <Input value={name} onChange={(e) => setName(e.target.value)}/>
        </CardContent>
        <CardContent>
            <p>Card Content</p>
            <Textarea value={describe} onChange={(e) => setDescribe(e.target.value)}/>
        </CardContent>
            <Button className='mx-auto w-[50%] cursor-pointer' onClick={fetchData}>Edit</Button>
        </Card>
    </div>
  )
}

export default page