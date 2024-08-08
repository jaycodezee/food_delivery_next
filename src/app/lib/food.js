const { default: mongoose } = require("mongoose");


const foodModel = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img_path: { type: String },
    description: { type: String },
    resto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant', required: true }
});

export const foodSchema= mongoose.models.food ||  mongoose.model("food",foodModel);