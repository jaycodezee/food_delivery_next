import { connectionStr } from "@/app/lib/db";
import { deliverySchema } from "@/app/lib/DeliveryBoy";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    try {
        const user = await deliverySchema.findOne({ email: payload.email });
        if (user && await payload.password) {
            success = true;
            return NextResponse.json({ result: user, success });
        } else {
            return NextResponse.json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ success: false, message: "An error occurred during login" });
    }
}
