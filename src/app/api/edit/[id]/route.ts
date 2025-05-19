import { PrismaClient } from "@/generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET (req : Request,  context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const Id = Number(id)
    try {
        if (isNaN(Id)) {
            return NextResponse.json(
                { success: false, error: "Invalid ID format" },
                { status: 400 }
            )
        }
        const menu = await prisma.recipe.findMany({
            where:{
                id : Id,
            }
        })
        return NextResponse.json(menu)
    } catch (error) {
        console.log('error' , error)
        return NextResponse.json({error,success : false})
    }
}

export async function PUT(req : Request, props: {params : Promise<{id : string}>}) {
    const params = await props.params;
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
export async function DELETE(
    req : Request,
    props: {params : Promise<{id : string , recipeId : string}>}
) {
    const params = await props.params;
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