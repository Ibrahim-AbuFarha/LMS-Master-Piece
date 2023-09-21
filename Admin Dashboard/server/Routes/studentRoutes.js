const express = require('express');
const Router = express.Router();
const {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
  getStudent,
  getStudentByName,
} = require('../Controllers/studentController');
const {
  signUpStudent,
  signInStudent,
} = require('../Controllers/authentication');

Router.route('/').get(getAllStudents).post(createStudent);
Router.route('/searchByName').get(getStudentByName);
Router.route('/:id').delete(deleteStudent).patch(updateStudent).get(getStudent);
Router.route('/signUpStudent').post(signUpStudent);
Router.route('/signInStudent').post(signInStudent);

module.exports = Router;
