import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

let isConnected = false;

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

    // Check if the client is already connected
    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
        // console.log('helo :>> ');
          await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
      }
  }
  

  await connectToDatabase()

    let result = await restaurantSchema.find(filter);
    // console.log("Result:", result); 

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch data" });
  } finally {

    // await mongoose.disconnect();
  }
}
