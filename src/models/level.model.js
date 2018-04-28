import mongoose from 'mongoose';

let LevelSchema = new mongoose.Schema({
  name  : { type: String, required: true },
  order : { type: Number, min: 1 },
  hasScores: { type: Boolean, default: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true }
});

let Level = mongoose.model('Level', LevelSchema);

export default Level;