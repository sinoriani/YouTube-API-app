const express = require('express');
const usersRouter = express.Router();
const {getInfo} = require('../controllers/users')
const {createUser} = require('../controllers/users')
const {updatePoints} = require('../controllers/users')
const {protect} = require('../middleware/auth')

usersRouter.route('/info').get(protect, getInfo);
usersRouter.route('/create').post(createUser)
usersRouter.route('/updatePoints').patch(updatePoints)
exports.usersRouter = usersRouter;