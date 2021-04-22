const express = require('express');
const channelsRouter = express.Router();
const {getChannel, getAllChannels, insertSubscription,mySubscriptions} = require('../controllers/channels')
const {protect} = require('../middleware/auth')

channelsRouter.route('/get').get(protect, getChannel);
channelsRouter.route('/getAll').get(protect, getAllChannels);
channelsRouter.route('/subscription').post(protect, insertSubscription);
channelsRouter.route('/mySubscriptions').get(protect, mySubscriptions);



exports.channelsRouter = channelsRouter;