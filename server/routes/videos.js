const express = require('express');
const videosRouter = express.Router();
const {getVideoById} = require('../controllers/videos')
const {protect} = require('../middleware/auth')
const {youtube} = require('../routes/youtubeAuth')


videosRouter.get('/get', getVideoById);


exports.videosRouter = videosRouter;