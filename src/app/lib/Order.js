import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  foodItemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'food' }], // Correct reference
  resto_id: mongoose.Schema.Types.ObjectId,
  deliveryBoy_id: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: 'Pending' },
  amount: Number,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
