import mongoose from 'mongoose';

let LessonSchema = new mongoose.Schema({
  name  : { type: String, required: true },
  order : { type: Number, min: 1, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

let Lesson = mongoose.model('Lesson', LessonSchema);

export default Lesson;