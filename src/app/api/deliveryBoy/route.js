import { connectionStr } from "@/app/lib/db";
import { deliverySchema } from "@/app/lib/DeliveryBoy";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    try {
        const existingUserByEmail = await deliverySchema.findOne({ email: payload.email });
        const existingUserByUsername = await deliverySchema.findOne({ username: payload.username });

        if (existingUserByEmail) {
            return NextResponse.json({ success: false, message: "Email already registered" });
        }
        
        if (existingUserByUsername) {
            return NextResponse.json({ success: false, message: "Username already taken" });
        }

        const hashedPassword = await payload.password

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
        return NextResponse.json({ success: false, message: "An error occurred during signup" });
    }
}