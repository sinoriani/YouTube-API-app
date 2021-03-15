const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;
const { getNewToken, clientId, clientSecret, redirectUrl } = require('../routes/youtubeAuth');

exports.protect = asyncHandler(async (req, res, next) => {
    let token

    // if (req.body.token) {
    //     token = req.body.token
    // }
    if(req.query.access_token){
        token = {
            access_token: req.query.access_token,
            expiry_date : req.query.expiry_date,
            id_token : req.query.id_token,
            refresh_token : req.query.refresh_token,
            score: req.query.score,
            token_type : req.query.token_type
        }
    }
    // Set token from cookie
    // else if (req.cookies.token) {
    //   token = req.cookies.token
    // }

    if (!token) {
        var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
        let authUrl = getNewToken(oauth2Client);
        next(res.status(401).send({"msg":"Obtained auth url", "authUrl": authUrl}))
        // return res.status(401).send({"msg":"You need a token to access this route"})
        // return next(new ErrorResponse('You need a token to access this route', 401))
    }
    next()

})

