import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurant";
import { connectionStr } from "@/app/lib/db";

export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    const data = await restaurantSchema.find();
    return NextResponse.json({ result: data });
}

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;

    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

    if (payload.login) {
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password });
        if (result) {
            success = true;
        }
    } else {
        const existingRestaurant = await restaurantSchema.findOne({
            $or: [{ email: payload.email }, { restaurantContact: payload.restaurantContact }]
        });

        if (existingRestaurant) {
            return NextResponse.json({ message: 'Restaurant already registered', success: false });
        }

        const restaurant = new restaurantSchema(payload);
        result = await restaurant.save();
        if (result) {
            success = true;
        }
    }

    return NextResponse.json({ result, success });
}

// export async function DELETE(request, content) {
//     const id = content.params.id;
//     const loggedInUserId = request.headers.get('Authorization'); // Example: Get authenticated user ID from headers

//     try {
//         await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

//         const restaurant = await restaurantSchema.findOne({ _id: id, userId: loggedInUserId });

//         if (!restaurant) {
//             return NextResponse.json({ message: 'Restaurant not found or unauthorized', success: false }, { status: 403 });
//         }

//         const result = await restaurantSchema.findByIdAndDelete(id);

//         if (result) {
//             return NextResponse.json({ message: 'Restaurant deleted successfully', success: true });
//         } else {
//             return NextResponse.json({ message: 'Failed to delete restaurant', success: false });
//         }
//     } catch (error) {
//         console.error("Error deleting restaurant:", error);
//         return NextResponse.json({ message: 'Failed to delete restaurant', success: false });
//     }
// }