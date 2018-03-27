import mongoose from 'mongoose';

let CourseSchema = new mongoose.Schema({
  name    : { type: String, required: true },
  created : { type: Date, default: Date.now },
  description: { type: String }
});

let Course = mongoose.model('Course', CourseSchema);

export default Course;