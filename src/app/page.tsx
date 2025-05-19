'use client';
import React from 'react'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router';
import { useState } from 'react'; 
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const page = () => {
  const [email , setEmail] = useState<string>('')
  const [password , setPassword] = useState<string>('')
  const route = useRouter()
  const loginData = async (e : React.FormEvent) => {
    e.preventDefault()
    try {
        const user = await axios.post('/api/auth/signin' , {
            email,password
        }) 
        if(!email || !password) {
          alert('Must Input Email and Password.')
          window.location.reload()
        }else{
          const data = user.data
          // console.log(data.data.id)
          if (!data.success) {
            alert('Email or Password not valid.')
            window.location.reload()
          }else{
            route.push(`/recipe/${data.data.id}`)
          }
        }
    } catch (error) {
        console.log('error : ' , error)
        alert('Login Failed')
        window.location.reload()
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex w-[25%] flex-col justify-center items-center h-[40%] border-2 shadow-xl border-black rounded-2xl'>
        <h1 className='text-3xl font-bold text-center'>
          Login
        </h1>
            <form className='w-[90%] flex flex-col justify-center items-center' onSubmit={loginData}>
                <div className='flex flex-col gap-2 w-[90%] my-3'>
                    <label htmlFor="email" className='text-xl font-semibold'>Email</label>
                    <Input type="email" 
                    placeholder='Email'
                    name="email" id="email" className='px-2 py-3' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-2 w-[90%] my-3'>
                    <label htmlFor="password" className='text-xl font-semibold'>Password</label>
                    <Input type="password" 
                    placeholder='Password'
                    name="password" id="password" className='px-2 py-3' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='my-3 flex flex-col w-[90%] gap-2'>
                    <Button type='submit' className='cursor-pointer w-full hover:bg-white hover:text-black hover:border-2 ' >
                        Login
                    </Button>
                </div>
            </form>
            <div className='w-[81.5%] flex flex-col justify-center items-center'>
              <Button className='cursor-pointer w-full bg-white text-black border-2 hover:bg-black hover:text-white'
              onClick={() => route.push('/register')}>
                Register
              </Button>
            </div>
      </div>
    </div>
  )
}

export default page