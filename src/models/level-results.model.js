import mongoose from 'mongoose';

let LevelResultsSchema = new mongoose.Schema({
  seconds : { type: Number, min: 0, required: true },
  level   : { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
  user    : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

let LevelResults = mongoose.model('LevelResults', LevelResultsSchema);

export default LevelResults;