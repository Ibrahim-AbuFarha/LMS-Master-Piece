const express = require('express');
const Router = express.Router();
const {
  signUpTeacher,
  signInTeacher,
  logout,
} = require('./../Controllers/authentication');

const {
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
  getTeacher,
  createTeacher,
  approveRequest,
  deleteRequest,
  getCurrentTeacher,
} = require('./../Controllers/teacherController');
const { protect } = require('../middleware/auth');

Router.route('/').get(getAllTeachers).post(createTeacher);
Router.route('/currentTeacher').get(protect, getCurrentTeacher);
Router.route('/signUpTeacher').post(signUpTeacher);
Router.route('/signInTeacher').post(signInTeacher);
Router.route('/logout').get(logout);
Router.route('/:id').delete(deleteTeacher).patch(updateTeacher).get(getTeacher);
Router.route('/updateRequest/:id').patch(approveRequest).delete(deleteRequest);
// Router.route('/getRequest/:email').get(getRequest);

module.exports = Router;
