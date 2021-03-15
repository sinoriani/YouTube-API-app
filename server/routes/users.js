const express = require('express');
const usersRouter = express.Router();
const {getInfo} = require('../controllers/users')
const {protect} = require('../middleware/auth')

usersRouter.route('/info').get(protect, getInfo);

exports.usersRouter = usersRouter;