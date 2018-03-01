import mongoose from 'mongoose';

let EnrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

let Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;