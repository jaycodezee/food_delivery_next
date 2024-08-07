import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";

// Function to validate food data
const validateFoodData = (data) => {
  const errors = {};
  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length === 0
  )
    errors.name = "Invalid food name";
  if (!data.price || typeof data.price !== "number" || data.price <= 0)
    errors.price = "Invalid price";
  if (
    !data.img_path ||
    typeof data.img_path !== "string" ||
    data.img_path.trim().length === 0
  )
    errors.img_path = "Invalid image path";
  if (
    !data.description ||
    typeof data.description !== "string" ||
    data.description.trim().length === 0
  )
    errors.description = "Invalid description";
  if (!data.resto_id || !mongoose.Types.ObjectId.isValid(data.resto_id))
    errors.resto_id = "Invalid restaurant ID";

  return errors;
};

export async function GET() {
  try {
    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
          await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
      }
  }
  
  await connectToDatabase()

    const foods = await foodSchema.find();
    return NextResponse.json({ result: foods }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching food items" },
      { status: 500 }
    );
  }
}

// POST handler to create a new food item
export async function POST(request) {
  try {
    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
          await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
      }
  }
  
  await connectToDatabase()

    const payload = await request.json();
    const validationErrors = validateFoodData(payload);

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { errors: validationErrors, success: false },
        { status: 400 }
      );
    }

    const food = new foodSchema(payload);
    const result = await food.save();
    return NextResponse.json({ result, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the food item" },
      { status: 500 }
    );
  }
}
