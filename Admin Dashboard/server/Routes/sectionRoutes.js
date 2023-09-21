const express = require('express');
const Router = express.Router();
const {
  AddSection,
  getAllSections,
  AddLesson,
  deleteLesson,
  getSection,
} = require('../Controllers/sectionController');
Router.route('/').get(getAllSections).post(AddSection);
Router.route('/:id').get(getSection);
Router.route('/addLesson').post(AddLesson);
Router.route('/:sectionId/deleteLesson/:lessonId').delete(deleteLesson);

module.exports = Router;
