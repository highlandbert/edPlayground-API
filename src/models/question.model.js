import mongoose from 'mongoose';

let QuestionSchema = new mongoose.Schema({
  content : { type: String, required: true },
  created: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true }
});

let Question = mongoose.model('Question', QuestionSchema);

export default Question;