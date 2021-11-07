const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      unique: true,
      cast: false,
      validate: {
        validator(email) {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
          }
          return false;
        },
        message: 'Please enter valid email',
      },
    },
    name: {
      type: String,
      cast: false,
      required: [true, 'Please enter your name'],
    },
    password: {
      type: Number,
      cast: false,
      required: [true, 'Please enter your password'],
    },
    userType: {
      type: String,
      cast: false,
      required: [true, 'Please enter your user type'],
      enum: ['admin', 'user']
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;