import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name    : { type: String, required: true },
  password: { type: String, required: true },
  surname : String,
  mail    : { type: String, required: true },
  birth   : { type: Date, required: true },
  since   : { type: Date, default: Date.now }
});

let User = mongoose.model('User', UserSchema);

export default User;