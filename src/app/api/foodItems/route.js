import { NextResponse } from "next/server";
import { foodSchema } from "@/app/lib/food";
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";

export async function POST(req) {
  try {
    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
          await mongoose.connect(connectionStr, { useUnifiedTopology: true });
      }
  }
  
  await connectToDatabase()
    const { ids } = await req.json();
    const foodItems = await foodSchema.find({ _id: { $in: ids } }).lean();
    return NextResponse.json({ success: true, foodItems }, { status: 200 });
  } catch (error) {
    console.error("Error fetching food items:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
