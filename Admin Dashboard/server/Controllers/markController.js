const Mark = require('../Models/markModel');
const ClassRoom = require('../Models/classRoomModel');
const Student = require('../Models/studentModel');

//get all marks
exports.getAllMarks = async (req, res) => {
  try {
    const marks = await Mark.find({});
    //check if marks is exist

    if (!marks) throw new Error('mark  is not exist');

    res.status(200).json({
      status: 'success',
      marks,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
//get mark
exports.getMark = async (req, res, next) => {
  const mark = await Mark.findById(req.params.id);
  //check if mark is exist

  if (!mark) throw new Error('mark  is not exist');

  res.status(200).json({
    status: 'success',
    data: {
      mark,
    },
  });
};
//create mark
exports.createMark = async (req, res) => {
  try {
    const { classId, studentId } = req.body;
    const classRoom = await ClassRoom.find({ classId });
    const student = await Student.find({ studentId });
    //check if there is classRoom and student
    if (!classRoom) throw new Error('classRoom is not exist');
    if (!student) throw new Error('student is not exist');
    const mark = await Mark.create(req.body);

    if (!mark) throw new Error('mark  is not exist');
    res.status(201).json({
      status: 'success',
      mark,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
//delete mark
exports.deleteMark = async (req, res) => {
  try {
    const { id } = req.params;
    const mark = await Mark.findByIdAndDelete(id);
    //check if classRoom is exist

    if (!mark) throw new Error('mark  is not exist');

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
//update mark
exports.updateMark = async (req, res) => {
  try {
    const { id } = req.params;
    const mark = await Mark.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    //check if mark is exist

    if (!mark) throw new Error('mark  is not exist');

    res.status(200).json({
      status: 'success',
      mark,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
