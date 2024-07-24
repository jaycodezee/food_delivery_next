import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import { restaurantSchema } from "@/app/lib/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Create a connection function to reuse the connection
async function connectToDatabase() {
    console.log('connection :>> ',mongoose.connection.readyState);
    if (!mongoose.connection.readyState) {
        // console.log("object")
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}

export async function GET(request, content) {
    const id = content.params.id;
    // console.log(id);
    try {
        // Ensure the connection is established before performing any operations
        await connectToDatabase();

        const details = await restaurantSchema.findOne({ _id: id });
        const foodItems = await foodSchema.find({ resto_id: id });

        return NextResponse.json({ success: true, details, foodItems });
    } catch (error) {
        console.error("Error fetching restaurant details:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}
