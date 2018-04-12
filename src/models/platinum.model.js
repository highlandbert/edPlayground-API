import mongoose from 'mongoose';

let PlatinumSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }
});

let Platinum = mongoose.model('Platinum', PlatinumSchema);

export default Platinum;