// Create a schema
// Create the model from that schema
// and at the end export that model

import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  image: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide us a valid email'],
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'writer', 'reader'],
      message: '{VALUE} is not supported',
    },
    required: true,
    default: 'reader',
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minLength: 8,
    maxLength: 24,
  },
  confirmPassword: {
    type: String,
    required: [true, 'ConfirmPassword is required'],
    minLength: 8,
    maxLength: 24,
    validate: {
      // This only works on CREATE and SAVE
      // Not on findOneAndUpdate or findByIdAndUpdate
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwords are different',
    },
  },
});

// Presave middleware basically runs before saving the data
userSchema.pre('save', async function (next) {
  console.log(this.isModified('password'));
  if (!this.isModified('password')) return next();
  // if the password is changed or created new then encrypt the password
  // Check when it works and when it doesn't
  // How does bcrypt work?
  // first a salt is generated if you don't provide it
  // second the password and salt are combined.(salt is basically a random string);
  // then based on the cost factor they are hashed
  // cost factor tells how many iterations to perform
  // it's something like 2^16 in this case
  // at the time of verification same process happens and it is checked if the password matches or not.
  // we don't really get the hashed password
  // also the salt and cost factor are in the final hash.
  this.password = await bcrypt.hash(this.password, 16);
  this.confirmPassword = undefined;
  next();
});

// three cases where isModified needs to be checked
// 1. New user is created
// 2. While updating user data
// 3. while updating password

const User = mongoose.model('user', userSchema);

export default User;
