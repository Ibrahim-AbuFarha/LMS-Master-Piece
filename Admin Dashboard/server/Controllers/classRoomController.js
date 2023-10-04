const ClassRoom = require('../Models/classRoomModel');
const Student = require('../Models/studentModel');
const Teacher = require('./../Models/teacherModel');
const Mark = require('./../Models/markModel');

const ApiFeatures = require('./../utils/ApiFeatures');
//get all classRooms
exports.getAllClassRooms = async (req, res) => {
  try {
    //pagination and filter added in classRoom
    const features = new ApiFeatures(ClassRoom, req.query).filter();
    const classRooms = await features.query;

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
//create classRoom if the teacherId is exist
exports.createClassRoom = async (req, res) => {
  try {
    const { id: teacherId } = req.user;

    const teacher = await Teacher.find({ teacherId });
    //check it the teacher is exist
    if (!teacher) throw new Error('teacher is not exist');
    const classRoom = await ClassRoom.create({ ...req.body, teacherId });
    console.log(classRoom);

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
//delete classRoom
exports.deleteClassRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const classRoom = await ClassRoom.findByIdAndDelete(id);
    if (!classRoom) throw new Error('No classRoom found with that ID');
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
//update classRoom
exports.updateClassRoom = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const classRoom = await ClassRoom.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    //return the modified document after the update operation ("new:true")
    console.log(classRoom);
    if (!classRoom) throw new Error('No classRoom found with that ID');

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
//get classRoom with students array using populate
exports.getClassRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    //find classRoom and populate with student array
    const classRoom = await ClassRoom.findById(id)
      .populate({
        path: 'students._id',
        model: 'Student',
        select: 'fullName email address mobile grade age img',
      })

      .exec();
    //check if classRoom is exist
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
// add student to classRoom
exports.addStudentToClass = async (req, res) => {
  try {
    console.log('88998');
    const { classId, studentId } = req.params;
    const classRoom = await ClassRoom.findById(classId);
    //check if classRoom is exist

    if (!classRoom) {
      throw new Error('No classRoom found with that ID');
    }
    const student = await Student.findById(studentId);
    //check if student is exist

    if (!student) {
      throw new Error('No student found with that ID');
    }
    //check if the student is already exist in the class
    const check = classRoom.students.find((item) => {
      return item._id.toString() === studentId;
    });

    if (check) throw new Error('student is already exist');
    //push the new user into in class and the new class into the student
    classRoom.students.push(student._id);
    student.classRooms.push(classRoom._id);
    //add the student into classRooms
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

//delete student from classRoom
exports.deleteStudentFromClass = async (req, res) => {
  try {
    console.log(req.params);
    const { classId, studentId } = req.params;
    const classRoom = await ClassRoom.findById(classId);
    //check if classRoom is exist

    if (!classRoom) {
      throw new Error('No classRoom found with that ID');
    }

    const student = await Student.findById(studentId);
    //remove student from the classRoom
    classRoom.students = classRoom.students.filter(
      (item) => item._id.toString() !== studentId
    );
    //Remove the classRoom from student
    student.classRooms = student.classRooms.filter(
      (item) => item._id.toString() !== classId
    );

    await classRoom.save();
    //validate without save to ignore the required values
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
