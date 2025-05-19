'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface recipe{  id:string;   name : string;    description : string}

const card = ({name , description ,id}:recipe) => {

  const route = useRouter()
  return (
    <div className='border-3 w-100 h-70 rounded-2xl shadow-lg flex flex-col justify-around items-center'>
        <h1  className='text-3xl font-semibold'>{name}</h1>
        <Dialog>
          <DialogTrigger><Button className='cursor-pointer px-15 py-8 text-xl'>Detail</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-xl'>Details</DialogTitle>
              <DialogDescription className='text-lg'> 
                {description}
              </DialogDescription>
              <Button className='cursor-pointer' onClick={() => route.push(`/edit/${id}`)}>Edit</Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default card