import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    const data = await userSchema.find();
    return NextResponse.json({ result: data });
}

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    try {
        // Check if the email already exists in the database
        const existingUser = await userSchema.findOne({ email: payload.email });

        if (existingUser) {
            // Email already exists, return error
            return NextResponse.json({ success: false, message: "Email already registered" });
        }

        // If email doesn't exist, proceed with login or signup based on payload
        let result = null;

        if (payload.login) {
            // Perform login if login flag is true
            result = await userSchema.findOne({ email: payload.email, password: payload.password });

            if (result) {
                success = true;
            }
        } else {
            // Perform signup if login flag is not present or false
            const newUser = new userSchema(payload);
            result = await newUser.save();
            success = true;
        }

        return NextResponse.json({ result, success });
    } catch (error) {
        console.error("Error during login/signup:", error);
        return NextResponse.json({ success: false, message: "An error occurred during login/signup" });
    } 
}