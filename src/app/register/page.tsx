'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'


const page = () => {
  const [name , setName] = useState<string>('')
  const [email , setEmail] = useState<string>('')
  const [password , setPassword] = useState<string>('')

  const route = useRouter()
  const registerData = async (e : React.FormEvent) => {
    e.preventDefault()
    try {
        const user = await axios.post('/api/auth/signup' , {
            name,email,password
        })
        const data = user.data
        if (!data.success) {
            throw new Error()
        }
        alert('Register Successfully!')
        route.push('/')
    } catch (error) {
        console.log('error : ' , error)
        alert('Register Failed')
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex w-[25%] flex-col justify-center items-center h-[45%] border-2 shadow-xl border-black rounded-2xl'>
            <h1 className='text-3xl font-bold text-center'>
                Register
            </h1>
            <form className='w-[90%] flex flex-col justify-center items-center' onSubmit={registerData}>
                    <div className='flex flex-col gap-2 w-[90%] my-3'>
                        <label htmlFor="name" className='text-xl font-semibold'>Name</label>
                        <Input 
                        placeholder='Name'
                        className='px-2 py-3'
                        type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='flex flex-col gap-2 w-[90%] my-3'>
                        <label htmlFor="email" className='text-xl font-semibold'>Email</label>
                        <Input 
                        placeholder='Email'
                        className='px-2 py-3'
                        type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='flex flex-col gap-2 w-[90%] my-3'>
                        <label htmlFor="password" className='text-xl font-semibold'>Password</label>
                        <Input 
                        placeholder='Password'
                        className='px-2 py-3'
                        type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='my-3 flex flex-col w-[90%] gap-2'>
                        <Button type='submit' className='cursor-pointer w-full hover:bg-white hover:text-black hover:border-2 '>
                            Register
                        </Button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default page