import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurant";
import { connectionStr } from "@/app/lib/db";

export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    const data = await restaurantSchema.find();
    return NextResponse.json({ result: data });
}

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;

    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

    if (payload.login) {
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password });
        if (result) {
            success = true;
        }
    } else {
        // Check if the restaurant is already registered
        const existingRestaurant = await restaurantSchema.findOne({
            $or: [{ email: payload.email }, { restaurantContact: payload.restaurantContact }]
        });

        if (existingRestaurant) {
            return NextResponse.json({ message: 'Restaurant already registered', success: false });
        }

        const restaurant = new restaurantSchema(payload);
        result = await restaurant.save();
        if (result) {
            success = true;
        }
    }

    return NextResponse.json({ result, success });
}
