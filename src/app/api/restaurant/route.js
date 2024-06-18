import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurant";
import { connectionStr } from "@/app/lib/db";


export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    const data = await restaurantSchema.find()
    // console.log(data);
    
    return NextResponse.json({ result: data })

}

export async function POST(request){
    let payload = await request.json();
    console.log(payload)
    // let result;
    // let success = false
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    const restaurant = new restaurantSchema(payload)
    const result = restaurant.save()
    return NextResponse.json({ result, success:true })
}