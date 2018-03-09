import mongoose from 'mongoose';

let EnrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

let Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;