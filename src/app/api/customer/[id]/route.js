import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/food";
import { restaurantSchema } from "@/app/lib/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){

    const id = content.params.id;
    console.log(id);

    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    const details=await restaurantSchema.findOne({_id:id})
    const foodItems=await foodSchema.find({resto_id:id})


    return NextResponse.json({success:true,details,foodItems})

}