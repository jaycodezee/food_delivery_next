import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import {userSchema} from '@/app/lib/userModel';  

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await userSchema.findById(id);
    if (user) {
      return NextResponse.json({ success: true, user });
    } else {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ success: false, error: 'An error occurred' }, { status: 500 });
  }
}
