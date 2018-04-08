import mongoose from 'mongoose';

let QuestionSchema = new mongoose.Schema({
  content : { type: String, required: true },
  created: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

let Question = mongoose.model('Question', QuestionSchema);

export default Question;