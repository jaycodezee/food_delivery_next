const { default: mongoose } = require("mongoose");


const restaurantModel = new mongoose.Schema({
    ownerName: String,
    restaurantName: String,
    password: String,
    confirmPassword: String,
    email: String,
    city: String,
    address: String,
    pinCode: Number,
    restaurantContact: Number,
});

export const restaurantSchema = mongoose.models.restaurants || mongoose.model("restaurant", restaurantModel);