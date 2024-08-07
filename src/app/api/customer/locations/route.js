import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
          await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
      }
  }
  
  await connectToDatabase()

    let result = await restaurantSchema.find();

    result = result.map(
      (item) => item?.city?.charAt(0).toUpperCase() + item?.city?.slice(1)
    );
    result = [...new Set(result)];

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching restaurants:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching the restaurants",
      },
      { status: 500 }
    );
  } finally {
    await mongoose.connection.close();
  }
}
