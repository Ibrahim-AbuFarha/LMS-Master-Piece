const ClassRoom = require('../Models/classRoomModel');
const Student = require('../Models/studentModel');
const Teacher = require('./../Models/teacherModel');
const Mark = require('./../Models/markModel');

const ApiFeatures = require('./../utils/ApiFeatures');

exports.getAllClassRooms = async (req, res) => {
  try {
    const features = new ApiFeatures(ClassRoom, req.query).filter();
    const classRooms = await features.query;

    // if (!classRooms) {
    //   // return next(new AppError('No tour found with that ID', 404));
    // }

    res.status(200).json({
      status: 'success',
      classRooms,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createClassRoom = async (req, res) => {
  try {
    const { id: teacherId } = req.user;
    console.log(teacherId);
    console.log(req.body);
    const teacher = await Teacher.find({ teacherId });
    if (!teacher) throw new Error('teacher is not exist');
    const classRoom = await ClassRoom.create({ ...req.body, teacherId });
    console.log(classRoom);
    // if (!classRoom) {
    //   // return next(new AppError('No tour found with that ID', 404));
    // }
    res.status(201).json({
      status: 'success',
      classRoom,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.deleteClassRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const classRoom = await ClassRoom.findByIdAndDelete(id);
    // if (!classRoom) {
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
exports.updateClassRoom = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const classRoom = await ClassRoom.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(classRoom);
    // if (!classRoom) {
    //   // return next(new AppError('No tour found with that ID', 404));
    // }
    res.status(200).json({
      classRoom,
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getClassRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const classRoom = await ClassRoom.findById(id)
      .populate({
        path: 'students._id',
        model: 'Student',
        select: 'fullName email address mobile grade age img',
      })

      .exec();
    if (!classRoom) {
      throw new Error('No classRoom found with that ID');
    }
    res.status(200).json({
      status: 'success',
      classRoom,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.addStudentToClass = async (req, res) => {
  try {
    console.log('88998');
    const { classId, studentId } = req.params;
    const classRoom = await ClassRoom.findById(classId);
    if (!classRoom) {
      throw new Error('No classRoom found with that ID');
    }
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('No student found with that ID');
    }

    const check = classRoom.students.find((item) => {
      return item._id.toString() === studentId;
    });

    if (check) throw new Error('student is already exist');

    classRoom.students.push(student._id);
    student.classRooms.push(classRoom._id);

    const addedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        classRooms: student.classRooms,
      },
      { new: true }
    );
    console.log(addedStudent);
    await classRoom.save();

    res.status(200).json({
      status: 'success',
      addedStudent,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteStudentFromClass = async (req, res) => {
  try {
    console.log(req.params);
    const { classId, studentId } = req.params;
    const classRoom = await ClassRoom.findById(classId);
    if (!classRoom) {
      throw new Error('No classRoom found with that ID');
    }

    console.log(classRoom);
    const student = await Student.findById(studentId);

    classRoom.students = classRoom.students.filter(
      (item) => item._id.toString() !== studentId
    );
    student.classRooms = student.classRooms.filter(
      (item) => item._id.toString() !== classId
    );

    await classRoom.save();
    await student.save({ validateBeforeSave: false });
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.editStudentMark = async (req, res) => {
  try {
    const { first, mid, final } = req.body;

    const { classId, studentId } = req.params;

    const classRoom = await ClassRoom.findById(classId);
    if (!classRoom) {
      throw new Error('No classRoom found with that ID');
    }
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('No student found with that ID');
    }

    const indx = classRoom.students.findIndex(
      (student) => student._id.toString() === studentId
    );

    const currStudentMark = classRoom.students[indx].marks;

    currStudentMark.first = first;
    currStudentMark.mid = mid;
    currStudentMark.final = final;

    await classRoom.save();

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
