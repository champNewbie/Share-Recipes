import { PrismaClient } from "@/generated/prisma"
import { NextResponse } from "next/server"
import {v2 as cloudinary} from 'cloudinary'

const withCORS = (res : Response) => {
    res.headers.set("Access-Control-Allow-Origin","*")
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
    return res;
}

const prisma = new PrismaClient()
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY
})

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
        const res =  NextResponse.json(menu)
        return withCORS(res)
    } catch (error) {
        console.log('error' , error)
        return NextResponse.json({error,success : false})
    }
}

export async function POST (req : Request , context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const userId = Number(id)
    try {
        const formData = await req.formData()
        const menuName = formData.get('menuName') as string
        const describe = formData.get('describe') as string
        const imageFile = formData.get('image') as File

        let imageUrl = null
        if (imageFile) {
            // Convert the file to base64
            const bytes = await imageFile.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const base64Image = `data:${imageFile.type};base64,${buffer.toString('base64')}`

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(base64Image, {
                folder: 'recipe-images',
            })
            imageUrl = result.secure_url
        }

        const menu = await prisma.recipe.create({
            data:{
                menuName,
                describe,
                userId,
                image: imageUrl
            }
        })
        const res =  NextResponse.json({success:true, data: menu})
        return withCORS(res)
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({error, success: false}, { status: 500 })
    }
}

export async function DELETE(
    req : Request,
    props: {params : Promise<{id : string}>}
) {
    const params = await props.params;
    try {
        await prisma.recipe.delete({
            where:{
                id : Number(params.id)
            }
        })
        const res = NextResponse.json({mess : 'delete successfully' , success : true})
        return withCORS(res)
    } catch (error) {
        console.log('error' , error)
        return NextResponse.json({error,success : false})
    }
}