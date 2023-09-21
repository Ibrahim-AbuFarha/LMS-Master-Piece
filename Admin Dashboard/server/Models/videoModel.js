
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassRoom',
    required: [true, 'Please provide classId'],
  },
  url: { type: String, required: [true, 'Please provide video link'] },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
//get all /search pagination


// 