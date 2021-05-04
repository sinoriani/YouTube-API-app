const express = require('express');
const channelsRouter = express.Router();
const {getChannel,  insertSubscription,mySubscriptions,IsSubscribed,getAllvideos,getVideoStats} = require('../controllers/channels')
const {protect} = require('../middleware/auth')

channelsRouter.route('/get').get(protect, getChannel);
channelsRouter.route('/subscription').post(protect, insertSubscription);
channelsRouter.route('/mySubscriptions').get(protect, mySubscriptions);
channelsRouter.route('/IsSubscribed').get(protect, IsSubscribed);
channelsRouter.route('/getvideos').get(protect, getAllvideos);
channelsRouter.route('/getvideostats').get(protect, getVideoStats);


exports.channelsRouter = channelsRouter;