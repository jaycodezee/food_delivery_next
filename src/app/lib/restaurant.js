const { default: mongoose } = require("mongoose");


const restaurantModel = new mongoose.Schema({
    ownerName: String,
    restaurantName: String,
    password: String,
    confirmPassword: String,
    email: String,
    city: String,
    address: String,
    pinCode: String,
    restaurantContact: String,
});

export const restaurantSchema = mongoose.models.new
    || mongoose.model("new", restaurantModel);