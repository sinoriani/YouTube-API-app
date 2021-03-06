
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { oauth2Client, youtube } = require('../routes/youtubeAuth');
const asyncHandler = require('../middleware/async')
const { queryToObj } = require("../utils/queryCredentials")

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
    if (mine) {
        options.mine = mine
    }
    else if (username) {
        options.forUsername = username
    } else if (id) {
        options.id = id
    } else {
        return res.status(400).send({ 'msg': "You forgot to include the username or id in the request's body" })
    }

    youtube.channels
        .list(options)
        .then(function (response) {
            var channel = response.data.items;
            if (channel == undefined) {
                res.status(400).send("no channel found")
            } else {
                res.status(200).json(channel)
                console.log(channel);
            }
        })

})

// get all videos filtered by channelId
exports.getAllvideos = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'snippet',
        type:"video",
        channelId: req.query.channelId,
        maxResults: 6
    }

    youtube.search.list(options)
        .then(function (response) {
            var channels = response.data.items;
            if (channels == undefined) {
                res.status(400).send("no channels found")
            } else {
               
                res.status(200).json(channels)
            }

        })

})

exports.getVideoStats = asyncHandler(async (req, res, next) => {

    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'statistics',
        id : req.query.id
    }
 
    youtube.videos
        .list(options)
        .then( (response) => {
            var videoStats = response.data.items[0].statistics.viewCount;
            if (videoStats == undefined ) {
                res.status(400).send("no video found")
            } else {
                res.status(200).send(videoStats);
            }
        })
        .catch(err => console.error(err))

})

exports.insertSubscription = asyncHandler(async (req, res, next) => {

    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'snippet',
        resource: {
            snippet: {
                resourceId: {
                    channelId: req.query.channelId
                }
            }
        }
    }
    youtube.subscriptions
        .insert(options)
        .then(function (response) {
            res.status(200).send("ok")


        })
        .catch(function (err) {
            console.log(err);

            res.status(400).send("oops");
        })

})

exports.IsSubscribed = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'snippet',
        forChannelId: req.query.forChannelId,
        mine: true,
    }
    /*let channelId = req.query.forChannelId;
    console.log(channelId);
    if(channelId){
        options.forChannelId = channelId;
    }*/
    youtube.subscriptions.list(options)
        .then(function (response) {
            console.log(response.data);
            if (response.data.items.length == 0) { res.status(200).send({"isSubbed":false}); }
            else { res.status(200).send({"isSubbed":true}); }

        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send("oops");
        })
})



exports.mySubscriptions = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'snippet',
        mine: true,
        maxResults: 10
    }

    youtube.subscriptions
        .list(options)
        .then(function (response) {
            var channels = response.data.items;
            if (channels == undefined) {
                res.status(400).send("no susbscriptions")
            } else {
                res.status(200).json(channels)
            }

        })

})