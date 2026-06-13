const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = function (enteredPassword) {
  const hashed = crypto.createHash('sha256').update(enteredPassword).digest('hex');
  return hashed === this.password;
};

module.exports = mongoose.model('User', userSchema);