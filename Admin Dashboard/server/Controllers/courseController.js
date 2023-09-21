const Course = require('./../Models/courseModel');
const Teacher = require('./../Models/teacherModel');
const ApiFeatures = require('./../utils/ApiFeatures');

exports.getAllCourses = async (req, res) => {
  try {
    const features = new ApiFeatures(Course, req.query).filter();
    const courses = await features.query;

    // if (!courses) {
    //   // return next(new AppError('No tour found with that ID', 404));
    // }
    res.status(200).json({
      state: 'success',
      courses,
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  console.log('1');
  const course = await Course.findById(req.params.id)
    .populate('sections')
    .populate('teacherId')

    .exec(); //shorthand for having to write this
  //course.findOne({_id:req.params.id})
  console.log(course);
  if (!course) {
    throw new Error('No course found with that ID', 404);
  }
  res.status(200).json({
    status: 'success',

    course,
  });
};

exports.createCourse = async (req, res) => {
  try {
    const { id: teacherId } = req.user;
    const teacher = await Teacher.find({ teacherId });
    if (!teacher) throw new Error('classRoom is not exist');
    const course = await Course.create({ ...req.body, teacherId });

    //check if there is classRoom and student
    if (!course) throw new Error('classRoom is not exist');
    res.status(201).json({
      state: 'success',
      course,
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    // if (!course) {
    //   //   return next(new AppError('No tour found with that ID', 404));
    // }
    res.status(200).json({
      state: 'success',
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      state: 'success',
      course,
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};

//   _id: new ObjectId("64fa4087dff4bd8ce509ed7d"),
//   img: 'https://as1.ftcdn.net/v2/jpg/03/70/42/66/1000_F_370426690_Pejt9KxjWTHPklsKwripaxr0iA17zupF.jpg',
//   sections: [
//     {
//       _id: new ObjectId("64fa4091dff4bd8ce509ed81"),
//       title: 'orasa',
//       courseId: new ObjectId("64fa4087dff4bd8ce509ed7d"),
//       lessons: [Array],
//       __v: 23
//     },
//     {
//       _id: new ObjectId("64fa428449961342ea245a15"),
//       title: 'aasd',
//       courseId: new ObjectId("64fa4087dff4bd8ce509ed7d"),
//       lessons: [],
//       __v: 9
//     },
//     {
//       _id: new ObjectId("650600d0a325a435b840c9ac"),
//       title: 'yt',
//       courseId: new ObjectId("64fa4087dff4bd8ce509ed7d"),
//       lessons: [],
//       __v: 0
//     }
//   ],
//   name: 'hello',
//   desc: 'asdfghklz',
//   teacherId: new ObjectId("64e99fd628088aea43866180"),
//   __v: 3
// }
