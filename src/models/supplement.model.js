import mongoose from 'mongoose';

let SupplementSchema = new mongoose.Schema({
  name    : { type: String, required: true },
  order   : { type: Number, min: 1 },
  content : { type: String, required: true },
  lesson  : { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true }
});

let Supplement = mongoose.model('Supplement', SupplementSchema);

export default Supplement;