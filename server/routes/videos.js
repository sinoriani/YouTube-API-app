const express = require('express');
const videosRouter = express.Router();
const {getVideoById, getVideosByCategory, getRelatedVideos} = require('../controllers/videos')
const {protect} = require('../middleware/auth')
const {youtube} = require('../routes/youtubeAuth')


videosRouter.get('/get', getVideoById);
videosRouter.get('/getVideosByCategory', getVideosByCategory);
videosRouter.get('/getRelatedVideos', getRelatedVideos);

exports.videosRouter = videosRouter;