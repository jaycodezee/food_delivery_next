import { connectionStr } from "@/app/lib/db";
import { deliverySchema } from "@/app/lib/DeliveryBoy";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { validateEmail } from "@/app/lib/validateEmail";

export async function POST(request) {
  async function connectToDatabase() {
    if (!mongoose.connection.readyState) {
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}

await connectToDatabase()

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
    const user = await deliverySchema.findOne({ email: payload.email });
    if (user && (await payload.password)) {
      success = true;
      return NextResponse.json({ result: user, success }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred during login",
    });
  }
}
