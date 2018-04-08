import mongoose from 'mongoose';

let AnswerSchema = new mongoose.Schema({
  content : { type: String, required: true },
  created: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }
});

let Answer = mongoose.model('Answer', AnswerSchema);

export default Answer;