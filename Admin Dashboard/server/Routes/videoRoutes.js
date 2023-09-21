const express = require('express');
const Router = express.Router();
const {
  getAllVideos,
  addVideo,
  deleteVideo,
} = require('../Controllers/videoController');
Router.route('/').get(getAllVideos).post(addVideo);
Router.route('/:id').delete(deleteVideo);

module.exports = Router;
