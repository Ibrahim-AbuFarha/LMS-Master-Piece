const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please provide class id'],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Please provide student id'],
  },
  first: Number,
  mid: Number,
  final: Number,
});

const Mark = mongoose.model('Mark', marksSchema);

module.exports = Mark;
//students
//mark
