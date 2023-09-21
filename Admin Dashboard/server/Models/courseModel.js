const mongoose = require('mongoose');
const Section = require('./sectionModel');

const courseSchema = new mongoose.Schema({
  img: {
    type: String,
    default:
      'https://as1.ftcdn.net/v2/jpg/03/70/42/66/1000_F_370426690_Pejt9KxjWTHPklsKwripaxr0iA17zupF.jpg',
  },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: Section }],
  name: { type: String, required: [true, 'Please provide name'] },
  desc: { type: String, required: [true, 'Please provide description'] },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Please provide teacherId'],
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
