import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  foodItemIds: [String],
  resto_id: mongoose.Schema.Types.ObjectId,
  deliveryBoy_id: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: 'Pending' },
  amount: Number,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
