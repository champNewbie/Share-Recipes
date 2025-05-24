'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import axios from 'axios';
import { redirect, useParams, useRouter } from 'next/navigation';

interface recipe{  id:string;   name : string;    description : string , image : string}

const MenuCard = ({name , description ,id , image}:recipe) => {
  const route = useRouter()
  const params = useParams()
  const [menusList , setMenuList] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const userId : Number = Number(params.id)

  const fetchMenus = async () => {
    try {
      const menus = await axios.get(`/api/menu/${userId}`)
      const menuData = menus.data
      if (Array.isArray(menuData)){
        setMenuList(menuData)
      }else{
        setMenuList([menuData])
      }
    } catch (error) {
      console.log('error' , error)
    }
  }

  const deleteData = async () => {
    try {
      for (let i in menusList){
        if(menusList[i].menuName == name){
          try {
            await axios.delete(`/api/menu/${menusList[i].id}`)
            await fetchMenus() // Refresh the data after deletion
            window.location.reload() // Use Next.js router refresh
            break; 
          } catch (error) {
            console.log('error' , error)
          }
        }
      }
    } catch (error) {
      console.log('error' , error)
    }
  }

  useEffect(() => {
    fetchMenus()
  }, [userId])

  return (
        <div className={`border-3 w-100 h-auto rounded-2xl shadow-lg flex flex-col justify-around items-center py-3`}>
          <div className={`w-100 h-70 rounded-2xl flex flex-col justify-center items-center mb-5`}>
            <img src={image} alt={name} className='w-70 h-60 rounded-2xl'/>
            <h1 className='text-2xl font-semibold mt-2'>{name}</h1>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger className='ml-1 cursor-pointer bg-black text-white rounded-lg px-10 py-2 text-xl hover:bg-gray-800 duration-300'>Recipe</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='text-xl'>Recipe</DialogTitle>
                  <DialogDescription className='text-lg overflow-x-clip max-w-[460px] overflow-y-scroll max-h-[500px] whitespace-pre-line'> 
                    {description}
                  </DialogDescription>
                  <Button className='cursor-pointer' onClick={() => {
                    setIsOpen(false)
                    route.push(`/edit/${id}`)
                  }}>Edit</Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <AlertDialog>
                  <AlertDialogTrigger className='ml-1 bg-red-400 text-white hover:bg-red-800 cursor-pointer 
                  px-9 py-2 rounded-lg text-xl duration-300'>Delete</AlertDialogTrigger>
                  <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Details</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure that delete this recipe?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                        <AlertDialogAction className='bg-red-400 hover:bg-red-800 cursor-pointer '
                        onClick={deleteData}>Confirm</AlertDialogAction>
                      <AlertDialogCancel className='cursor-pointer '>Cancel</AlertDialogCancel >
                    </AlertDialogFooter>
                  </AlertDialogContent>
            </AlertDialog>
          </div>
    </div>
    
  )
}

export default MenuCard