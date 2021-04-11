const express = require('express');
const commentsRouter = express.Router();
const {getVideoComments, addComment} = require('../controllers/comments')
const {protect} = require('../middleware/auth')

commentsRouter.route('/get').get(protect, getVideoComments);
commentsRouter.route('/add').post(protect, addComment);

exports.commentsRouter = commentsRouter;