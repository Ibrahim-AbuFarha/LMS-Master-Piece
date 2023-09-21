const mongoose = require('mongoose');
const Student = require('./studentModel');
const classRoomSchema = new mongoose.Schema({
  capacity: { type: Number, default: 0 },
  subject: { type: String, required: [true, 'You must provide subject'] },
  imgUrl: {
    type: String,
    default:
      'https://images.theconversation.com/files/49135/original/22qc7r28-1400667334.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&h=539&fit=crop&dpr=1',
  },
  students: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: Student },
      marks: {
        type: { first: Number, mid: Number, final: Number },
        default: { first: 0, mid: 0, final: 0 },
      },
    },
  ],
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Please provide teacherId'],
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please provide courseId'],
  },
  grade: { type: Number, required: [true, 'Please provide grade'] },
});

const ClassRoom = mongoose.model('ClassRoom', classRoomSchema);

module.exports = ClassRoom;
