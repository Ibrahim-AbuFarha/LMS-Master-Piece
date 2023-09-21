const express = require('express');
const Router = express.Router();
const {
  createClassRoom,
  deleteClassRoom,
  getAllClassRooms,
  updateClassRoom,
  getClassRoom,
  addStudentToClass,
  deleteStudentFromClass,
  editStudentMark,
} = require('../Controllers/classRoomController');

const { protect } = require('../middleware/auth');

Router.route('/').get(getAllClassRooms).post(protect, createClassRoom);

Router.route('/:id')
  .get(getClassRoom)
  .delete(protect, deleteClassRoom)
  .patch(protect, updateClassRoom);

Router.route('/:classId/addStudentToClass/:studentId').post(
  protect,
  addStudentToClass
);

Router.route('/:classId/editStudentFromClass/:studentId')
  .delete(protect, deleteStudentFromClass)
  .patch(protect, editStudentMark);

module.exports = Router;
