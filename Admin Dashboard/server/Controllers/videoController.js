const Video = require('./../Models/videoModel');
const Course = require('./../Models/courseModel');


//get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});

    res.status(200).json({
      status: 'success',
      videos,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
//add new Video
exports.addVideo = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.find({ courseId });
    //check if there is classRoom and student
    if (!course) throw new Error('classRoom is not exist');

    const video = await Video.create(req.body);

    res.status(201).json({
      status: 'success',
      video,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
//delete video
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      throw new Error('No video found with that ID');
    }
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
