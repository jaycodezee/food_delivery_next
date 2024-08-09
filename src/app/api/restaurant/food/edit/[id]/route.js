import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Function to connect to the database

export async function GET(request, content) {
  const id = content.params.id;
  let success = false;
  
  try {
    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
          await mongoose.connect(connectionStr, { useUnifiedTopology: true });
      }
  }
  
  await connectToDatabase()
    const result = await foodSchema.findOne({ _id: id });

    if (result) {
      success = true;
      return NextResponse.json({ result, success }, { status: 200 });
    } else {
      return NextResponse.json(
        { success, message: "Food item not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching food item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching the food item",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, content) {
  const id = content.params.id;
  const payload = await request.json();
  let success = false;

  try {
    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
          await mongoose.connect(connectionStr, { useUnifiedTopology: true });
      }
  }
  
  await connectToDatabase()
    const result = await foodSchema.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    if (result) {
      success = true;
      return NextResponse.json({ result, success }, { status: 200 });
    } else {
      return NextResponse.json(
        { success, message: "Food item not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating food item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while updating the food item",
      },
      { status: 500 }
    );
  }
}
