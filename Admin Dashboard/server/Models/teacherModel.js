const mongoose = require('mongoose');
const validator = require('validator'); //package to create a custom validator
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const teacherSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please tell us full name'],
    },

    email: {
      type: String,
      lowercase: true,
      required: [true, 'Please provide your email'],
      validate: [validator.isEmail, 'Please provide a valid email'],
      unique: true,
    },

    address: String,
    mobile: {
      type: String,
      required: [true, 'please provide your number'],
      unique: true,
    },
    course: String,
    age: Number,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    gender: String,
    img: {
      type: String,
      default:
        'https://www.venkateshwaragroup.in/vgiblog/wp-content/uploads/2022/09/Untitled-design-2-1-660x330.jpg',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm a password'],
      validate: {
        validator: function (el) {
          return el === this.password; //abc===abc
        },
        message: 'Password are not the same ',
      },
    },
    status: {
      type: String,
      enum: ['declined', 'approved', 'pending'],
      default: 'pending',
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

teacherSchema.methods.correctPassword = async function (
  candidatePassword,
  teacherPassword
) {
  return await bcrypt.compare(candidatePassword, teacherPassword);
};
teacherSchema.methods.changePasswordAfter = function (JWTTimesStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(passwordChangedAt, JWTTimesStamp);
    return JWTTimesStamp < changedTimeStamp;
  }
  //
  return false;
};
teacherSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  //encrypting
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
  //we sent unencrypted token to the user
  //and store the encrypted token in db
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
