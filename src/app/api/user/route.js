import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import { validateEmail } from "@/app/lib/validateEmail";

export async function GET() {
  try {
    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
        await mongoose.connect(connectionStr, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }
    }

    await connectToDatabase();

    const data = await userSchema.find(
      {},
      {
        _id: 1,
        name: 1,
        email: 1,
        city: 1,
        address: 1,
        mobile: 1,
      }
    );
    return NextResponse.json({ result: data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!validateEmail(payload.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
        await mongoose.connect(connectionStr, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }
    }

    await connectToDatabase();

    const existingUser = await userSchema.findOne({ email: payload.email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    let result = null;
    let success = false;

    if (payload.login) {
      result = await userSchema.findOne({
        email: payload.email,
        password: payload.password,
      });

      if (result) {
        success = true;
        return NextResponse.json({ result, success }, { status: 200 });
      } else {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }
    } else {
      const newUser = new userSchema(payload);
      result = await newUser.save();
      success = true;
      return NextResponse.json({ result, success }, { status: 201 });
    }
  } catch (error) {
    console.error("Error during login/signup:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login/signup" },
      { status: 500 }
    );
  }
}
