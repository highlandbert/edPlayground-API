import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  mail: String,
  birth: Date,
  since: Date
});

let User = mongoose.model('User', UserSchema);

export default User;