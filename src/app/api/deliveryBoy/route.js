import { connectionStr } from "@/app/lib/db";
import { deliverySchema } from "@/app/lib/DeliveryBoy";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { validateEmail } from "@/app/lib/validateEmail";

export async function GET() {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const data = await deliverySchema.find();
    return NextResponse.json({ result: data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching delivery boys:", error);
    return NextResponse.json(
      { message: "Error fetching delivery boys", success: false },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  async function connectToDatabase() {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  }

  await connectToDatabase();

  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  if (!validateEmail(payload.email)) {
    return NextResponse.json(
      { success: false, message: "Invalid email format" },
      { status: 400 }
    );
  }
  try {
    const existingUserByEmail = await deliverySchema.findOne({
      email: payload.email,
    });
    const existingUserByUsername = await deliverySchema.findOne({
      username: payload.username,
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    if (existingUserByUsername) {
      return NextResponse.json({
        success: false,
        message: "Username already taken",
      });
    }

    const hashedPassword = await payload.password;

    const newUser = new deliverySchema({
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    success = true;

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
