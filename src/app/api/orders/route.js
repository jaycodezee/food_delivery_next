import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import Order from "@/app/lib/Order"; 

export async function GET(request) {
  await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const orders = await Order.find({});
    return new Response(JSON.stringify({ success: true, data: orders }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(JSON.stringify({ success: false, message: "Error fetching orders" }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
