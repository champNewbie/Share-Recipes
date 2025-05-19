import React , {useEffect,useState} from 'react'
import axios from 'axios'
import { redirect, useParams, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from '@/components/ui/button'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'


const navbar = () => {
  const [showUser , setShowUser] = useState<string>('')
  const params = useParams() //ใช้ useParams ในการรับค่า params จาก path
  const route = useRouter()
  useEffect(() => {
    const fetchUser = async () => {
      const id = Number(params.id)
      const user = await axios.get(`/api/auth/signin/${id}`)
      setShowUser((user.data.data.name).toUpperCase())
      // console.log(user.data.data)
    }
    fetchUser()
  },[showUser])
  return (

    <div>
        <div className='w-full h-20 bg-black flex flex-row justify-between items-center px-10'>
          <h1 className='text-white text-3xl font-bold'>Recipes</h1>
          <div className='flex justify-between items-center'>
              <Button onClick={() => route.push('/edit')} className='bg-white text-black hover:bg-gray-200 duration-300 ease-in
              text-xl px-5 py-5 cursor-pointer'>Create</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='ml-5 text-xl px-5 py-5 bg-white text-black cursor-pointer'>
                    <AvatarFallback className='px-0 py-0 font-bold'>{showUser[0]}{showUser[1]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Keyboard shortcuts
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem disabled>API</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => redirect('/')}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
          
      </div>
    </div>
  )
}

export default navbar