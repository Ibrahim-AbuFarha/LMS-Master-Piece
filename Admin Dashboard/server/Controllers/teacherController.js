const Teacher = require('./../Models/teacherModel');
const ApiFeatures = require('./../utils/ApiFeatures');

//get all teacher with pagination and filter
exports.getAllTeachers = async (req, res) => {
  try {
    const features = new ApiFeatures(Teacher, req.query).filter();
    const teachers = await features.query;
    // if (!teachers) {
    //   // return next(new AppError('No Teacher found with that ID', 404));
    // }

    res.status(200).json({
      state: 'success',
      teachers,
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};
//get teacher
exports.getTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id); //shorthand for having to write this
    //Teacher.findOne({_id:req.params.id})
    if (!teacher) {
      throw new Error('No Teacher found with that ID', 404);
    }
    res.status(200).json({
      status: 'success',
      data: {
        teacher,
      },
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};
//delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) throw new Error('teacher is not found with this id');
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
//update teacher info
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const teacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      state: 'success',
      teacher,
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};
//create teacher by admin
exports.createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create({ ...req.body, status: 'approved' });
    res.status(200).json({
      state: 'success',
      teacher,
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};
//approve request
exports.approveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );

    // send email to the teacher

    res.status(200).json({
      status: 'success',
      teacher,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
//delete request
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await Teacher.findByIdAndDelete(id);
    // send email to the teacher

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
//get current teacher
exports.getCurrentTeacher = async (req, res) => {
  const { user } = req;

  const teacher = await Teacher.findById(user.id);

  const { password, ...result } = teacher._doc;

  res.status(200).json({
    status: 'success',
    teacher: result,
  });
};
// exports.getRequest = async (req, res, next) => {
//   try {
//     const { email } = req.params;
//     console.log(email,55);
//     const teacher = await Teacher.findOne({ email }); //shorthand for having to write this
//     //Teacher.findOne({_id:req.params.id})
//     console.log(teacher)
//     if (!teacher) {
//       throw new Error('No Teacher found with that ID', 404);
//     }
//     res.status(200).json({
//       status: 'success',
//       data: {
//         teacher,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       state: 'fail',
//       message: err.message,
//     });
//   }
// };
