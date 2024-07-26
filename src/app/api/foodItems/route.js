import { NextResponse } from 'next/server';
import { foodSchema } from "@/app/lib/food";

export async function POST(req) {
  try {
    const { ids } = await req.json();
    const foodItems = await foodSchema.find({ '_id': { $in: ids } }).lean();
    return NextResponse.json({ success: true, foodItems });
  } catch (error) {
    console.error('Error fetching food items:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
