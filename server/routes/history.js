const express = require('express');
const historyRouter = express.Router();
const {getHistory} = require('../controllers/history')
const {protect} = require('../middleware/auth')

historyRouter.route('/get').get(protect, getHistory);

exports.historyRouter = historyRouter;