const express = require('express');
const videosRouter = express.Router();
const {getVideoById, getVideosByCategory, getRelatedVideos, getRecommendedVideos, getVideoRating, LikeVideo, DislikeVideo, getTrending, testrst} = require('../controllers/videos')
const {protect} = require('../middleware/auth')
const {youtube} = require('../routes/youtubeAuth')


videosRouter.get('/get', getVideoById);
videosRouter.get('/getVideosByCategory', getVideosByCategory);
videosRouter.get('/getRecommendedVideos', getRecommendedVideos);
videosRouter.get('/getRelatedVideos', getRelatedVideos);
videosRouter.route('/likeVideo').post(protect, LikeVideo );
videosRouter.route('/dislikeVideo').post(protect, DislikeVideo);
videosRouter.get('/getVideoRating', getVideoRating );
videosRouter.get('/getTrending', getTrending);
videosRouter.get('/test', testrst);
exports.videosRouter = videosRouter;