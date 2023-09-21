const express = require('express');
const Router = express.Router();

const {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
  getCourse,
} = require('./../Controllers/courseController');
const { protect } = require('../middleware/auth');

Router.route('/').get(getAllCourses).post(protect, createCourse);
Router.route('/:id')
  .delete(protect, deleteCourse)
  .patch(protect, updateCourse)
  .get(getCourse);

module.exports = Router;
