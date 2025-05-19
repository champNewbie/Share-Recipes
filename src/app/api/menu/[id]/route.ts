import { PrismaClient } from "@/generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET (req : Request,  context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const userId = Number(id)
    try {
        if (isNaN(userId)) {
            return NextResponse.json(
                { success: false, error: "Invalid ID format" , userId : userId},
                { status: 400 }
            )
        }
        const menu = await prisma.recipe.findMany({
            where:{
                userId,
            }
        })
        return NextResponse.json(menu)
    } catch (error) {
        console.log('error' , error)
        return NextResponse.json({error,success : false})
    }
}

export async function POST (req : Request , context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const userId = Number(id)
    try {
        const {menuName , describe } = await req.json()
        const menu = await prisma.recipe.create({
            data:{
                menuName,
                describe,
                userId
            }
        })
        return NextResponse.json({success:true , data : menu})
    } catch (error) {
        console.log('error ' , error)
    }
}
