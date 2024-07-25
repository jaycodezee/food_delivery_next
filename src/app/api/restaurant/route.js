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


// export async function DELETE(request) {
//     const token = request.headers.get('Authorization')?.replace('Bearer ', '') // Extract token from header

//     if (!token) {
//         return NextResponse.json({ message: 'Authorization token is missing', success: false }, { status: 401 })
//     }

//     try {
//         // Verify token and extract userId from it (Implement this function based on your auth setup)
//         const loggedInUserId = await verifyToken(token)

//         if (!loggedInUserId) {
//             return NextResponse.json({ message: 'Invalid', success: false }, { status: 401 })
//         }

//         const result = await restaurantSchema.findOneAndDelete({ userId: loggedInUserId })

//         if (result) {
//             return NextResponse.json({ message: 'Account deleted successfully', success: true })
//         } else {
//             return NextResponse.json({ message: 'Failed to delete account', success: false })
//         }
//     } catch (error) {
//         console.error("Error deleting account:", error)
//         return NextResponse.json({ message: 'Failed to delete account', success: false })
//     }
// }

// async function verifyToken(token) {
//     // Example verification logic
//     // Replace this with your actual token verification logic
//     // This is just a placeholder
//     return token === 'valid-token' ? 'user-id-from-token' : null
// }