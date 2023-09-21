const express = require('express');
const Router = express.Router();
const {
  createMark,
  deleteMark,
  getAllMarks,
  updateMark,
  getMark,
} = require('./../Controllers/markController');
Router.route('/').get(getAllMarks).post(createMark);
Router.route('/:id').delete(deleteMark).patch(updateMark).get(getMark);
module.exports = Router;

