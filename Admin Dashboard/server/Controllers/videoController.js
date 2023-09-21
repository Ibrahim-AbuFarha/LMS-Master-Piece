const Video = require('./../Models/videoModel');
const Course = require('./../Models/courseModel');

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

exports.addVideo = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.find({ courseId });
    //check if there is classRoom and student
    if (!course) throw new Error('classRoom is not exist');

    // check if the student is already joined

    const video = await Video.create(req.body);

    // if (!video) {
    //   // return next(new AppError('No tour found with that ID', 404));
    // }

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
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    // if (!video) {
    //   //   return next(new AppError('No tour found with that ID', 404));
    // }
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
