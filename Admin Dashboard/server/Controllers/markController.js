const Mark = require('../Models/markModel');
const ClassRoom = require('../Models/classRoomModel');
const Student = require('../Models/studentModel');
exports.getAllMarks = async (req, res) => {
  try {
    const marks = await Mark.find({});
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
exports.getMark = async (req, res, next) => {
  const mark = await Mark.findById(req.params.id); //shorthand for having to write this
  //mark.findOne({_id:req.params.id})
  if (!mark) throw new Error('mark  is not exist');

  res.status(200).json({
    status: 'success',
    data: {
      mark,
    },
  });
};
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
exports.deleteMark = async (req, res) => {
  try {
    const { id } = req.params;
    const mark = await Mark.findByIdAndDelete(id);
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
exports.updateMark = async (req, res) => {
  try {
    const { id } = req.params;
    const mark = await Mark.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
