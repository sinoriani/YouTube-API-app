
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { oauth2Client,youtube } = require('../routes/youtubeAuth');
const asyncHandler = require('../middleware/async')
const {queryToObj} = require("../utils/queryCredentials")

exports.getChannel = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'snippet,contentDetails,statistics',
    }

    // get the channel_username
    let mine = req.query.mine
    let username = req.query.username
    let id = req.query.id
    if(mine){
        options.mine = mine
    }
    else if(username){
        options.forUsername = username
    }else if(id){
        options.id = id
    }else{
        return res.status(400).send({'msg':"You forgot to include the username or id in the request's body"})
    }

    youtube.channels
        .list(options)
        .then(function (response) {
            var channel = response.data.items;
            if (channel == undefined ) {
                res.status(400).send("no channel found")
            } else {
                res.status(200).json(channel)
            }
    })

})