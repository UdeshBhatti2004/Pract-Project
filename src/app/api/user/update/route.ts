import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/model/user.model";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, image } = await req.json();

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        name,
        image,
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Profile updated",
      user,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
