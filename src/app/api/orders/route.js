import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import Order from '@/app/lib/Order';  
import FoodItem from '@/app/lib/food';

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });

  async function connectToDatabase() {
    if (!mongoose.connection.readyState) {
            await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}

await connectToDatabase()

  try {
    const orders = await Order.find({})
      .populate({path:'user_id', 
        select:'name mobile address'}) 
      .populate({
        path: 'foodItemIds',
        select :'name '
      })
      .exec();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ success: false, message: "An error occurred while fetching orders" });
  }
}