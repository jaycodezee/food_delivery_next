// src/app/api/restaurant/foods/route.jsx
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";

const validateFoodData = (data) => {
    const errors = {};
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) errors.name = 'Invalid food name';
    if (!data.price || typeof data.price !== 'number' || data.price <= 0) errors.price = 'Invalid price';
    if (!data.img_path || typeof data.img_path !== 'string' || data.img_path.trim().length === 0) errors.img_path = 'Invalid image path';
    if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) errors.description = 'Invalid description';
    if (!data.resto_id || !mongoose.Types.ObjectId.isValid(data.resto_id)) errors.resto_id = 'Invalid restaurant ID';

    return errors;
};

export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const foods = await foodSchema.find();
    return NextResponse.json({ result: foods });
}

export async function POST(request) {
    try {
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
        const payload = await request.json();
        const validationErrors = validateFoodData(payload);

        if (Object.keys(validationErrors).length > 0) {
            return NextResponse.json({ errors: validationErrors, success: false }, { status: 400 });
        }

        const food = new foodSchema(payload);
        const result = await food.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}
