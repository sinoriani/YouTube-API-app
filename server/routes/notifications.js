const express = require('express');
const notificationsRouter = express.Router();
const {getNotifications} = require('../controllers/notifications') 
const {protect} = require('../middleware/auth') 

notificationsRouter.route('/get').get(protect, getNotifications);

exports.notificationsRouter = notificationsRouter;