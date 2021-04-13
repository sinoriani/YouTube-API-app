const { google } = require('googleapis');
const fs = require("fs");
const OAuth2 = google.auth.OAuth2;
const { oauth2Client,youtube } = require('../routes/youtubeAuth');
const asyncHandler = require('../middleware/async')
const {queryToObj} = require("../utils/queryCredentials")
const multer = require("multer");

// add video
/*exports.addVideo = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    youtube.videos.insert(
        {
        resource: {
            // Video title and description
            snippet: {
                title:title,
                description:description
            },
            status: {
            privacyStatus: "private",
            },
        },
        // This is for the callback function
        part: "snippet,status",

        // Create the readable stream to upload the video
        media: {
            body: fs.createReadStream(req.file.path)
        },
        },
        (err, data) => {
        if(err) throw err
        console.log(data)
        console.log("Done.");
        fs.unlinkSync(req.file.path);
        res.render("success", { success: true });
        }
    );
});*/
// like and dislike
// report video
// delete video
// get videos
// get most popular
// get liked videos
// get the channel_videos
// get video by id


exports.getVideoById = asyncHandler(async (req, res, next) => {

    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'snippet,statistics',
        id: null
    }
    let id = req.query.id
    if (id){
        console.log('1 ' + id)
        options.id=id
    }
    else{
        console.log('2')
        return res.status(400).send({'msg':"You forgot to include the id in the request's body"})
    }
 
    youtube.videos
        .list(options)
        .then( response => {
            var video = response.data.items;
            console.log(video);
            if (video == undefined ) {
                res.status(400).send("no video found")
            } else {
                console.log("got it")
                res.status(200).send(video)
            }
        })
        .catch(err => console.error(err))




});
