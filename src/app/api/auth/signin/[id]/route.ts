import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

// Alternative approach using request URL to extract the user ID
export async function GET(request: Request) {
  try {
    // Extract userId from the URL directly to avoid the params.userId error
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const userIdStr = pathParts[pathParts.length - 1];
    
    if (!userIdStr) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }
    
    const id = Number(userIdStr);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid user ID format" },
        { status: 400 }
      );
    }
    
    const user = await prisma.users.findUnique({
      where: {
        id
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request , context: { params: Promise<{ id: string}> }) {
  const { id } = await context.params
  const userId = Number(id)
  try {
    // Extract userId from the URL directly to avoid the params.userId error
    const {name , email , password} = await request.json()
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }
    const updatePassword = await bcrypt.hash(password , 10)
    const updateUser = await prisma.users.update({
      where : {
        id : userId
      },
      data : {
        name , email , password : updatePassword
      }
    })
    return NextResponse.json({ success: true, data: updateUser });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}