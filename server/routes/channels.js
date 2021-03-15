const express = require('express');
const channelsRouter = express.Router();
const {getChannel} = require('../controllers/channels')
const {protect} = require('../middleware/auth')

channelsRouter.route('/get').get(protect, getChannel);

exports.channelsRouter = channelsRouter;