import { NextResponse } from 'next/server';
import Order from '@/app/lib/Order';
import mongoose from 'mongoose';
import { connectionStr } from '@/app/lib/db';


export async function GET(req) {
  try {
    // Connect to the database
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

    // Retrieve userId from query params
    const userId = req.nextUrl.searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // Fetch orders based on userId
    const orders = await Order.find({ user_id: new mongoose.Types.ObjectId(userId) }).lean();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { user_id, foodItemIds, resto_id, deliveryBoy_id, amount } = await req.json();
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    const order = new Order({
      user_id: mongoose.Types.ObjectId(user_id),
      foodItemIds,
      resto_id: mongoose.Types.ObjectId(resto_id),
      deliveryBoy_id: mongoose.Types.ObjectId(deliveryBoy_id),
      amount,
      status: 'Pending',
    });

    await order.save();

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
