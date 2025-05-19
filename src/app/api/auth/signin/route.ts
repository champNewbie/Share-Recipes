import bcrypt from 'bcrypt'
import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const POST = async (req : Request) => {
    try {
        const {email , password} = await req.json()
        if(!email || !password) return NextResponse.json({mess : "Login Failed"})
        const user = await prisma.users.findUnique({
            where : {
                email : email 
            }
        })
        if(!user){
            return NextResponse.json({mess : "Login Failed" ,success : false, data : user})
        }

        const valid = await bcrypt.compare( password ,user.password)
        if (!valid) {
            return NextResponse.json({mess : "Login Failed" ,success : false, data : user})
        }else{
            return NextResponse.json({mess : "Login Successfully!" ,success : true , data : user})
        }
    } catch (error) {
        console.log("error" , error)
    }
}