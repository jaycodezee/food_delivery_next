import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/app/lib/Order";
import { Food } from "@/app/lib/food";
import { User } from "@/app/lib/userModel";

export async function GET() {
  async function connectToDatabase() {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr, { useUnifiedTopology: true });
    }
  }

  await connectToDatabase();

  try {
    const orders = await Order.find({})
      .populate({ path: "user_id", select: "name mobile address" })
      .populate({ path: "foodItemIds", select: "name img_path" })
      .exec();

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching orders" },
      { status: 500 }
    );
  }
}

