import mongoose from 'mongoose';

let GoldSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', required: true }
});

let Gold = mongoose.model('Gold', GoldSchema);

export default Gold;