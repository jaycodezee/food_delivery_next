import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurant";
import { foodSchema } from "@/app/lib/food";
import { connectionStr } from "@/app/lib/db";
import jwt from 'jsonwebtoken'; 
require('dotenv').config();

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

export async function DELETE(req) {
    try {
        const { _id } = await req.json();

        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
        
        const result = await restaurantSchema.findByIdAndDelete(_id);
        if (result) {
            await foodSchema.deleteMany({ resto_id: _id });

            return NextResponse.json({ message:'Account and associated food items deleted successfully', success: true });
        } else {
            return NextResponse.json({ message: 'Failed to delete account', success: false });
        }
    } catch (error) {
        console.error("Error deleting account:", error);
        return NextResponse.json({ message: 'Failed to delete account', success: false });
    }
}
