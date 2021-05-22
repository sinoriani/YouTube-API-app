const express = require('express');
const usersRouter = express.Router();
const {getInfo} = require('../controllers/users')
const {createUser} = require('../controllers/users')
const {updatePoints,addWatchHistory,getUsers, addLikeHistory} = require('../controllers/users')
const {protect} = require('../middleware/auth')

usersRouter.route('/info').get(protect, getInfo);
usersRouter.route('/updatePoints').patch(updatePoints)
usersRouter.route('/addWatchHistory').get(addWatchHistory)
usersRouter.route('/addLikesHistory').get(addLikeHistory)
usersRouter.route('/getUsers').get(getUsers)


exports.usersRouter = usersRouter;