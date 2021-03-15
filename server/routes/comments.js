const express = require('express');
const commentsRouter = express.Router();
const {getComments} = require('../controllers/comments')
const {protect} = require('../middleware/auth')

commentsRouter.route('/get').get(protect, getComments);

exports.commentsRouter = commentsRouter;