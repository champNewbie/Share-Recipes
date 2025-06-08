'use client'
import React, { useState } from 'react'
import {Input} from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import axios from 'axios'
import { useRouter , useParams } from 'next/navigation'

const Page = () => {
  const [menuName , setMenuName] = useState<string>('')
  const [describe , setDescribe] = useState<string>('')
  const [image , setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const route = useRouter()
  const id = Number(params.id)

  const getData = async (e : React.FormEvent) => {
    e.preventDefault()
    if (!menuName || !describe) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('menuName', menuName)
      formData.append('describe', describe)
      if (image) {
        formData.append('image', image)
      }

      // Add a delay before sending the request
      await new Promise(resolve => setTimeout(resolve, 1000))

      const response = await axios.post(`/api/menu/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        route.push(`/recipe/${id}`)
      }
    } catch (error) {
      console.log('error' , error)
      alert('Failed to create recipe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB')
        return
      }
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      setImage(file)
    }
  }

  return (
    <div className='flex justify-center flex-col items-center mx-auto my-auto h-screen'>
      <div className='border-3 rounded-xl border-black w-[25%] h-[55%] flex flex-col justify-center items-center shadow-xl'>
        <h1 className='text-4xl font-bold'>
          Self-Recipe
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
                Recipe
              </h1>
              <Textarea placeholder='Menu'
              className='w-90 h-30' 
               value={describe} onChange={(e) => setDescribe(e.target.value)}/>
            </div>

            <div className='flex flex-col justify-around items-start mt-2'>
            <h1 className='text-xl my-1'>
                Upload Menu Image
              </h1>
              <Input 
                type='file' 
                className='w-90 my-1 cursor-pointer'  
                placeholder='Upload Image' 
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
        </form>
        <div className='mt-5'> 
              <AlertDialog>
                <AlertDialogTrigger 
                  className='bg-black text-white px-10 py-3 rounded-xl text-xl 
                  cursor-pointer hover:bg-gray-800 duration-300'
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Continue'}
                </AlertDialogTrigger>
                       <AlertDialogContent>
                    { (!menuName || !describe) ? (
                      <div>
                      <AlertDialogHeader>
                      <AlertDialogTitle>Error</AlertDialogTitle>
                      <AlertDialogDescription>
                        You must fill menu name and description.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel >Cancel</AlertDialogCancel >
                    </AlertDialogFooter>
                    </div>) : 
                      (
                      <div><AlertDialogHeader>
                        <AlertDialogTitle>Details</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure that create this recipe?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction 
                          onClick={getData} 
                          className='cursor-pointer'
                          disabled={isLoading}
                        >
                          {isLoading ? 'Creating...' : 'Confirm'}
                        </AlertDialogAction>
                        <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel >
                      </AlertDialogFooter>
                      </div>)
                    }
                      </AlertDialogContent>         
              </AlertDialog>
            </div>
      </div>
    </div>
  )
}

export default Page