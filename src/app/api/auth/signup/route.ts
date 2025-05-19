import { PrismaClient } from "@/generated/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt' //import bcrypt lib

const prisma = new PrismaClient()

export const POST = async (req : Request) => {
    try {
        const {name,email,password} = await req.json()
        const hashPassword = bcrypt.hashSync(password , 10) //hashing password with bcrypt via Synchronous
        const user = await prisma.users.create({
            data:{
                name,
                email,
                password : hashPassword
            }
        })
        return NextResponse.json({mess : "Sign Up Successfully!" ,success : true, data : user})
    } catch (error) {
        console.log('error ' , error)
    }
}