import mongoose from 'mongoose';

const deliveryBoySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const deliverySchema = mongoose.models.deliveryboys || mongoose.model('deliveryboy', deliveryBoySchema);
