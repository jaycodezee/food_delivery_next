import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import { restaurantSchema } from "@/app/lib/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Create a connection function to reuse the connection
async function connectToDatabase() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export async function GET(request, content) {
  const id = content.params.id;
  try {
    // Ensure the connection is established before performing any operations
    await connectToDatabase();

    const details = await restaurantSchema.findOne({ _id: id });
    const foodItems = await foodSchema.find({ resto_id: id });

    if (!details) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, details, foodItems },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 } // Internal Server Error status code
    );
  }
}
