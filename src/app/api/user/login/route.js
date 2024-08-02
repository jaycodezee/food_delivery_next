import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import { validateEmail } from "@/app/lib/validateEmail";

// Utility function to connect to the database
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();

    // Connect to the database
    await connectToDatabase();

    // Validate email format
    if (!validateEmail(payload.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if user exists with the provided email and password
    const user = await userSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    const success = !!user;

    return NextResponse.json(
      { result: user, success },
      { status: success ? 200 : 404 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during the request" },
      { status: 500 }
    );
  }
}
