const { google } = require('googleapis');
const fs = require("fs");
const OAuth2 = google.auth.OAuth2;
const { oauth2Client, youtube } = require('../routes/youtubeAuth');
const asyncHandler = require('../middleware/async')
const { queryToObj } = require("../utils/queryCredentials")
// const mysql_credentials = require('./users')
const mysql = require('mysql')
const multer = require("multer");
const { type } = require('os');

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
        type: "video",
        id: null
    }
    let id = req.query.id
    if (id) {
        options.id = id
    }
    else {
        return res.status(400).send({ 'msg': "You forgot to include the id in the request's body" })
    }

    youtube.videos
        .list(options)
        .then(response => {
            var video = response.data.items;
            if (video == undefined) {
                res.status(400).send("no video found")
            } else {
                res.status(200).send(video)
            }
        })
        .catch(err => console.error(err))
});

exports.LikeVideo = asyncHandler(async (req, res, next) => {

    oauth2Client.credentials = queryToObj(req.query)
    /*return gapi.client.youtube.videos.rate({
      "id": "Ks-_Mh1QhMc",
      "rating": "like"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
              */
    let options = {
        auth: oauth2Client,
        id: '779jI4Rwl5c',
        rating: 'like'
    }
    /*let id = req.query.id
    if (id){
        options.id=id
    }
    else{
        return res.status(400).send({'msg':"You forgot to include the id in the request's body"})
    }
    */
    youtube.videos
        .rate(options)
        .then(function (response) {  
                console.log(response);
                res.status(200).send("donee")
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send("error");  
        })


});

exports.DislikeVideo = asyncHandler(async (req, res, next) => {

    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        id: '779jI4Rwl5c',
        rating: 'dislike'
    }
    /*let id = req.query.id
    if (id){
        options.id=id
    }
    else{
        return res.status(400).send({'msg':"You forgot to include the id in the request's body"})
    }
    */
    youtube.videos
        .rate(options)
        .then(function (response) {  
                console.log(response);
                res.status(200).send("donee")
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send("error");  
        })


});

exports.getVideoRating = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        id: '779jI4Rwl5c'
        ,
    }
    /*let id = req.query.id

    if (id) {
        options.id = id
    }
    else {
        return res.status(400).send({ 'msg': "You forgot to include the Id" })
    }*/
    

    youtube.videos.getRating(options)
        .then(response => {
            var rating = response.data.items;
            if (rating == undefined) {
                res.status(400).send("no rating found")
            } else {
                console.log(rating);
               
                if (rating[0].rating== "like")
                { res.status(200).send({"isRated":"like"}); 
                    console.log(rating[0].rating)}
                else if (rating[0].rating== "dislike")
                { res.status(200).send({"isRated":"dislike"}); }
                else (response.data== []) 
                { res.status(200).send({"isRated":"notRated"}); }

            }
            
        })
        .catch(err => console.error(err))
});


exports.getVideosByCategory = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'snippet',
        videoCategoryId: null,
        type: "video"
    }
    let videoCategoryId = req.query.videoCategoryId
    if (videoCategoryId) {
        options.videoCategoryId = videoCategoryId
    }
    else {
        return res.status(400).send({ 'msg': "You forgot to include the videoCategoryId in the request's body" })
    }

    youtube.search
        .list(options)
        .then(response => {
            var video = response.data.items;
            if (video == undefined) {
                res.status(400).send("no video found")
            } else {
                res.status(200).send(video)
            }
        })
        .catch(err => console.error(err))
});



exports.getRelatedVideos = asyncHandler(async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    let options = {
        auth: oauth2Client,
        part: 'snippet',
        relatedToVideoId: null,
        type: "video",
        maxResults: 15
    }
    let relatedToVideoId = req.query.relatedToVideoId
    if (relatedToVideoId) {
        options.relatedToVideoId = relatedToVideoId
    }
    else {
        return res.status(400).send({ 'msg': "You forgot to include the relatedToVideoId in the request's body" })
    }

    youtube.search
        .list(options)
        .then(response => {
            var video = response.data.items;
            if (video == undefined) {
                res.status(400).send("no video found")
            } else {
                res.status(200).send(video)
            }
        })
        .catch(err => console.error(err))
});



function getDbCreds() {
    const data = fs.readFileSync('mysql_credentials.json', (err, content) => {
        if (err) {
            console.log('Error loading file: ' + err);
            return
        } else {
            console.log("got creds")
        }
    })
    var credentials = JSON.parse(data);
    // Authorize a client with the loaded credentials, then call the YouTube API.
    return credentials

}
const mysql_credentials = getDbCreds();


exports.getRecommendedVideos = async (req, res, next) => {
    oauth2Client.credentials = queryToObj(req.query)
    //connect database
    var con = mysql.createConnection(mysql_credentials);
    var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    });
    oauth2.userinfo.get(
        function (err, result) {
            if (err) {
                console.log("err ", err)
                return res.send(err)
            } else {
                con.connect(function (err) {
                    if (err) {
                        console.log("an error occured while connecting to db", err)
                        throw err
                    };
                    console.log("Connected!&!");
                });

                let user_id = result.data.id
                console.log('aaa', user_id)
                //prepare sql query 
                var sql = `SELECT video_id FROM watch_history WHERE user_id = '${user_id}' ORDER BY timestamp_ desc LIMIT 5;`


                //execute sql query 
                con.query(sql, ((error, result) => {
                    if (error) {
                        console.log("an error occured while getting recommended videos from db", error)
                        return res.send("an error occured while getting recommended videos from db")
                    } else {
                        // console.log(result)
                        res.status(200).send(result)

                        // var ids = ""
                        // var vids = []
                        // // ids += element.video_id + ","
                        // options.relatedToVideoId = result[0].video_id
                        // console.log(result[0].video_id);
                        // youtube.search
                        //     .list(options,)
                        //     .then(response => {
                        //         var videos = response.data.items;
                        //         if (videos == undefined) {
                        //         } else {
                        //             vids.push(...videos)
                        //         }
                        //     })

                    }

                }))

            }
        });
}
