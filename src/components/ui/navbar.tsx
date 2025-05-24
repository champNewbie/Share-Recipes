import React , {useEffect,useState} from 'react'
import axios from 'axios'
import { redirect, useParams, useRouter } from 'next/navigation';
import {Input} from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
import {Button} from '@/components/ui/button'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'


const navbar = () => {
  const [showUser , setShowUser] = useState<string>('')
  const params = useParams() //ใช้ useParams ในการรับค่า params จาก path
  const route = useRouter()
  const [name , setName] = useState<string>('')
  const [email , setEmail] = useState<string>('')
  const [password , setPassword] = useState<string>('')

  const id = Number(params.id)
  useEffect(() => {
    const fetchUser = async () => {
      const user = await axios.get(`/api/auth/signin/${id}`)
      setShowUser((user.data.data.name).toUpperCase())
    }
    fetchUser()
  },[showUser , email])
  const updateProfile = async (e : any) => {
    e.preventDefault()
    try {
      await axios.put(`/api/auth/signin/${id}` , {name , email , password})
      window.location.reload()
    } catch (error) {
      console.log('error' , error)
    }
  }
  return (
    <div>
        <div className='w-full h-20 bg-black flex flex-row justify-between items-center px-10'>
          <h1 className='text-white text-3xl font-bold'>Recipes</h1>
          <div className='flex justify-between items-center'>
              <Button onClick={() => route.push(`/create/${params.id}`)} className='bg-white text-black hover:bg-gray-200 duration-300 ease-in
              text-xl px-5 py-5 cursor-pointer'>Create</Button>
                <Sheet>
                  <SheetTrigger asChild> 
                    <Avatar className='ml-5 text-xl px-5 py-5 bg-white text-black cursor-pointer'>
                      <AvatarFallback className='px-0 py-0 font-bold'>{showUser[0]}{showUser[1]}</AvatarFallback>
                    </Avatar>
                  </SheetTrigger>
                  <SheetContent>
                    <div className='flex justify-between flex-col h-screen pb-5'>
                      <SheetHeader>
                      <SheetTitle className='text-3xl font-bold'>{showUser}</SheetTitle>
                          <h2>Edit Profile</h2>
                          <form>
                            <div className='mt-2'>
                              <label>Name</label>
                              <Input type='text' value={name} placeholder={showUser} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='mt-2'>
                              <label>Email</label>
                              <Input type='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className='mt-2'>
                              <label>Password</label>
                              <Input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <AlertDialog >
                                <AlertDialogTrigger className='ml-1 my-3 bg-yellow-500 text-white hover:bg-yellow-800 cursor-pointer 
                                w-full py-1 rounded-lg text-lg duration-300'>Edit</AlertDialogTrigger>
                                <AlertDialogContent>
                                  { (name && email && password) ? (
                                   <div>
                                     <AlertDialogHeader>
                                      <AlertDialogTitle>Details</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure that update User?
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogAction className='bg-black hover:bg-gray-800 cursor-pointer '
                                      onClick={updateProfile}>Confirm</AlertDialogAction>
                                          <AlertDialogCancel className='cursor-pointer '>Cancel</AlertDialogCancel >
                                      </AlertDialogFooter>
                                   </div>
                                   ) : (
                                      <div>
                                     <AlertDialogHeader>
                                      <AlertDialogTitle className='text-red-400'>Error</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          You must fill name , email , and password for update Profile.  
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                       <AlertDialogFooter>
                                          <AlertDialogCancel className='cursor-pointer '>OK</AlertDialogCancel >
                                      </AlertDialogFooter>
                                   </div> 
                                   )}
                                  </AlertDialogContent>
                            </AlertDialog>
                           </form>
                      </SheetHeader>
                      <Button className='ml-2 cursor-pointer w-30 text-lg' onClick={() => redirect('/')}>Logout</Button>
                    </div>
                  </SheetContent>
                </Sheet>
          </div>
          
      </div>
    </div>
  )
}

export default navbar