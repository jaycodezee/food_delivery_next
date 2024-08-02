import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Function to connect to the database
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export async function GET(request, content) {
  const id = content.params.id;
  let success = false;

  try {
    await connectToDatabase();
    const result = await foodSchema.find({ resto_id: id });

    if (result.length > 0) {
      success = true;
      return NextResponse.json({ result, success }, { status: 200 });
    } else {
      return NextResponse.json({ result: [], success }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching food items:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching food items",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, content) {
  const id = content.params.id;
  let success = false;

  try {
    await connectToDatabase();
    const result = await foodSchema.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      success = true;
      return NextResponse.json({ success }, { status: 200 });
    } else {
      return NextResponse.json(
        { success, message: "Food item not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting food item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while deleting the food item",
      },
      { status: 500 }
    );
  }
}
