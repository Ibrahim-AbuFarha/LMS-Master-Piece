const Student = require('./../Models/studentModel');
const ApiFeatures = require('./../utils/ApiFeatures');

//get all student with filter and pagination
exports.getAllStudents = async (req, res) => {
  try {
    const features = new ApiFeatures(Student, req.query).filter().paginate(); //{[]}

    const count = await Student.find().count();

    const students = await features.query;
    res.status(200).json({
      state: 'success',
      results: { students, count },
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};
//get student by name (search )
exports.getStudentByName = async (req, res) => {
  const { searchString } = req.query;
  //find the students count
  const count = await Student.find().count();
  //find the student by search string query
  const students = await Student.find({
    fullName: { $regex: searchString, $options: 'i' },
  })
    //send the students without password
    .select('-password')
    //limit just 10 students
    .limit(10);

  res.status(200).json({
    state: 'success',
    results: { students, count },
  });
};
//create student
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    console.log(student);
    res.status(200).json({
      state: 'success',
      student,
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};
//delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) throw newError('No student found with that ID');

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
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      state: 'success',
      student,
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};

exports.getStudent = async (req, res, next) => {
  const student = await Student.findById(req.params.id)
    .populate({ path: 'classRooms' })
    .exec();
  if (!student) {
    throw new Error('No student found with that ID', 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
};
