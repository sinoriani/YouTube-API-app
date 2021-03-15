
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { oauth2Client,youtube } = require('../routes/youtubeAuth');
const asyncHandler = require('../middleware/async')
const {queryToObj} = require("../utils/queryCredentials")

exports.getInfo = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    // oauth2Client.setCredentials({access_token: req.body.token.access_token});
    var oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });
    oauth2.userinfo.get(
      function(err, result) {
        if (err) {
           res.send(err)
        } else {
           res.send(result.data)
        }
    });

})