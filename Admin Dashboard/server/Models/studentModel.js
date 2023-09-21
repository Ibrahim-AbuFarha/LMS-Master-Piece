const mongoose = require('mongoose');
const validator = require('validator'); //package to create a custom validator
const bcrypt = require('bcryptjs');
const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Please provide fullName'] },

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
  grade: Number,
  age: Number,
  img: {
    type: String,
    default:
      'https://img.freepik.com/free-photo/young-man-student-with-notebooks-showing-thumb-up-approval-smiling-satisfied-blue-studio-background_1258-65597.jpg?w=996&t=st=1692494764~exp=1692495364~hmac=dad7bc65aa12f003e60637c9270955e319be8862ae76efc2ceca47cec8012dca',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm a password'],
    //This only occur on save and create !!
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same ',
    },
  },
  classRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassRoom',
    },
  ],
});

//the encryption will happen between the moment we save the data and the moment it persist in db
//doc mw
studentSchema.pre('save', async function (next) {
  //only run this fun if password was actually modified
  if (!this.isModified('password')) return next();
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});
studentSchema.methods.correctPassword = async function (
  candidatePassword,
  studentPassword
) {
  return await bcrypt.compare(candidatePassword, studentPassword);
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
