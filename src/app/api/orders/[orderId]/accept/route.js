import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import Order from "@/app/lib/Order" ;

export async function POST(request, { params }) {
  const { orderId } = params;
  await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status: 'Accepted' }, { new: true });
    return new Response(JSON.stringify({ success: true, data: order }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error accepting order:", error);
    return new Response(JSON.stringify({ success: false, message: "Error accepting order" }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
