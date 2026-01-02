import connectDb from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    await connectDb();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
     
    if(password.length < 6){
        return NextResponse.json(
        { message: "Password must be 6 Character long" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password,10)  

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    
     return NextResponse.json(
        { message: "User created Succesfully" },
        { status: 201 }
      );
    

  } catch (error) {
     return NextResponse.json(
        { message: "Internal server Error",error },
        { status: 500 }
      );
  }
}
