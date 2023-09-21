const express = require('express');
const Router = express.Router();
const {
  numberOfResources,
  getTeacherDataByMonth,
} = require('../Controllers/analysisControllers');

Router.route('/').get(numberOfResources);
Router.route('/getTeacherDataByMonth').get(getTeacherDataByMonth);

module.exports = Router;
