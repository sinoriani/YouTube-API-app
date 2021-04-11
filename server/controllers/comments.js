
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2; 
const { oauth2Client,youtube } = require('../routes/youtubeAuth');
const asyncHandler = require('../middleware/async')
const {queryToObj} = require("../utils/queryCredentials")


exports.getVideoComments = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'replies,snippet,id',
        videoId: req.query.videoId
    }

    youtube.commentThreads
        .list(options)
        .then(function (response) {
            var comments = response.data.items;
            if (comments == undefined ) {
                res.status(400).send("no video found")
            } else {
                res.status(200).json(comments)
            }
        })
        .catch((error) => {
            console.log(error)
        })

})

exports.addComment = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part:"snippet",
        snippet: {
            "videoId": req.body.data.videoId,
            "channelId": req.body.data.channelId,
            "topLevelComment": {
              "snippet": {
                "textOriginal": req.body.data.content
              }
            }
        }
    }

    console.log(options.snippet)


    youtube.commentThreads
        .insert(options)
        .then(function (response) {
            res.status(200).json(response)
        })
        .catch((error) => {
            console.log(error)
            res.status(422).json(error)
        })

})