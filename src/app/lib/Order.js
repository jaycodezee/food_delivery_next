import mongoose from 'mongoose';

// Define the FoodItem schema
const FoodItemSchema = new mongoose.Schema({
  name: String,
  // Other fields
});

 const FoodItem = mongoose.models.FoodItems || mongoose.model('FoodItem', FoodItemSchema);

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: String,
  // Other fields
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Define the Order schema
const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  foodItemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }],
  resto_id: mongoose.Schema.Types.ObjectId,
  deliveryBoy_id: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: 'Pending' },
  amount: Number,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
