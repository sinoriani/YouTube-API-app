const express = require('express');
const commentsRouter = express.Router();
const {getVideoComments} = require('../controllers/comments')
const {protect} = require('../middleware/auth')

commentsRouter.route('/get').get(protect, getVideoComments);

exports.commentsRouter = commentsRouter;