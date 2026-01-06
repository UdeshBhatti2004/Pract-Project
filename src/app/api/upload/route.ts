export const runtime = "nodejs";

import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file uploded" }, { status: 400 });
    }

    /// converting file in to buffer

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /// upload to cloudinary

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profile-images",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    // sending cloudinary image url to frontend

    return NextResponse.json({
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 }
    );
  }
}
