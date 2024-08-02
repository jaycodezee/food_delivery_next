import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  let queryParams = request.nextUrl.searchParams;
  let filter = {};

  try {
    if (queryParams.get("location")) {
      let city = queryParams.get("location");
      filter = { city: { $regex: new RegExp(city, "i") } };
    } else if (queryParams.get("restaurant")) {
      let name = queryParams.get("restaurant");
      filter = { restaurantName: { $regex: new RegExp(name, "i") } };
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    let result = await restaurantSchema.find(filter);

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
