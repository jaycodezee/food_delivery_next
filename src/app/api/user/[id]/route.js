import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import {userSchema} from '@/app/lib/userModel';  
import { connectionStr } from "@/app/lib/db";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    async function connectToDatabase() {
      if (!mongoose.connection.readyState) {
        await mongoose.connect(connectionStr, {
         
          useUnifiedTopology: true,
        });
      }
    }

    await connectToDatabase();
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
