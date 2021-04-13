
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { oauth2Client,youtube } = require('../routes/youtubeAuth');
const asyncHandler = require('../middleware/async')

exports.getComments = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = req.body.token;
    
    // code goes here

})