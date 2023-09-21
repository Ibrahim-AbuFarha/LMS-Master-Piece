const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please provide A title'] },
  url: { type: String, required: [true, 'Please provide A url'] },
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please provide A title'] },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please provide a courseId'],
  },
  lessons: [lessonSchema],
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
