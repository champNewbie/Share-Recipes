import { PrismaClient } from "@/generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function PUT (req : Request, {params} : {params : {id : string}} ){
    try {
        const recipeId = await Number(params.id)
        const {menuName , describe } = await req.json()
        const updateMenu = await prisma.recipe.update({
            where:{
                id : recipeId 
            },
            data:{
                menuName,
                describe,
            }
        })
        return NextResponse.json({success : true,data : updateMenu})
    } catch (error) {
        console.log('error' , error)
        return NextResponse.json({error,success : false})
    }
}
export async function DELETE (req : Request,{params} : {params : {id : string , recipeId : string}} ) {
    try {
        const userId = await Number(params.id)
        const recipeId = await Number(params.recipeId)
        await prisma.recipe.delete({
            where:{
                id : recipeId ,
                userId : userId
            }
        })
        return NextResponse.json({mess : 'delete successfully' , success : true})
    } catch (error) {
        console.log('error' , error)
        return NextResponse.json({error,success : false})
    }
}