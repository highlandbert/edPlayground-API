import mongoose from 'mongoose';

let LessonResultsSchema = new mongoose.Schema({
  results : { type: String, required: true },
  lesson  : { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true }
});

let LessonResults = mongoose.model('LessonResults', LessonResultsSchema);

export default LessonResults;