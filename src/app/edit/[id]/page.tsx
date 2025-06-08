'use client'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
const Page = () => {
  const [menuName , setMenuName] = useState<string>('')
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
            setMenuName(formattedData[0].menuName);
            setDescribe(formattedData[0].describe);
            setUserId(formattedData[0].userId)
        }
    } catch (error) {
        console.log('error' , error)
    }
  }
  const fetchData = async (e : React.FormEvent) => {
    const id = Number(params.id)
    e.preventDefault()
    try {
        await axios.put(`/api/edit/${id}` , {menuName , describe})
        route.push(`/recipe/${userId}`)
    } catch (error) {
      console.log('error ' , error)
    }
  }
  useEffect(() => {
    getData()
  },[])

  return (
    <div className='flex justify-center h-screen items-center mx-2'>
        <Card className='w-[50%]'>
        <CardHeader>
            <CardTitle>Edit Detail</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Menu Name</p>
            <Input value={menuName} onChange={(e) => setMenuName(e.target.value)}/>
        </CardContent>
        <CardContent>
            <p>Describe</p>
            <Textarea value={describe} onChange={(e) => setDescribe(e.target.value)}/>
        </CardContent>
        <div className='flex justify-center items-center'>
        <AlertDialog>
                <AlertDialogTrigger className='bg-black text-white px-20 py-2 rounded-xl text-lg 
                cursor-pointer hover:bg-gray-800 duration-300'>Edit</AlertDialogTrigger>
                <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Details</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure that update this recipe?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                      <AlertDialogAction onClick={fetchData} className='cursor-pointer '>Confirm</AlertDialogAction>
                    <AlertDialogCancel className='cursor-pointer '>Cancel</AlertDialogCancel >
                  </AlertDialogFooter>
                </AlertDialogContent>
          
          </AlertDialog></div>
        </Card>
    </div>
  )
}

export default Page