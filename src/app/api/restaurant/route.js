import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurant";
import { foodSchema } from "@/app/lib/food";
import { connectionStr } from "@/app/lib/db";
import { validateEmail } from "@/app/lib/validateEmail";

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const data = await restaurantSchema.find();
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { message: "Failed to fetch restaurants", success: false },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const payload = await request.json();
    let result;
    let success = false;

    if (!validateEmail(payload.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (payload.login) {
      result = await restaurantSchema.findOne({
        email: payload.email,
        password: payload.password,
      });
      success = !!result;
    } else {
      const existingRestaurant = await restaurantSchema.findOne({
        $or: [
          { email: payload.email },
          { restaurantContact: payload.restaurantContact },
        ],
      });

      if (existingRestaurant) {
        return NextResponse.json(
          { message: "Restaurant already registered", success: false },
          { status: 400 }
        );
      }

      const restaurant = new restaurantSchema(payload);
      result = await restaurant.save();
      success = !!result;
    }

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error during POST operation:", error);
    return NextResponse.json(
      { message: "An error occurred during the operation", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { _id } = await req.json();

    const result = await restaurantSchema.findByIdAndDelete(_id);
    if (result) {
      await foodSchema.deleteMany({ resto_id: _id });
      return NextResponse.json({
        message: "Account and associated food items deleted successfully",
        success: true,
      });
    } else {
      return NextResponse.json(
        { message: "Failed to delete account", success: false },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { message: "Failed to delete account", success: false },
      { status: 500 }
    );
  }
}
