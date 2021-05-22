
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { oauth2Client, youtube } = require('../routes/youtubeAuth');
const asyncHandler = require('../middleware/async')
const { queryToObj } = require("../utils/queryCredentials")
const mysql = require('mysql')
var fs = require('fs');
var readline = require('readline');
var axios = require('axios');

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

exports.mysql_credentials = mysql_credentials;

exports.getInfo = asyncHandler(async (req, res, next) => {
  oauth2Client.credentials = queryToObj(req.query)
  
  let code="";
//get countryCode
  axios.get('http://ip-api.com/json/?fields=countryCode')
.then(function(response) {
  console.log(response.data);
  code=response.data.countryCode;
});
  //connect database
  var con = mysql.createConnection(mysql_credentials);
  
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  var oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2'
  });
  oauth2.userinfo.get(
    function (err, result) {
      if (err) {
        console.log("err ",err)
        res.send(err)
      } else {
        let user = result.data
        console.log(user);
        //prepare sql query 
        var sql = `INSERT INTO user(id,name,given_name,family_name,picture,locale,countryCode)  
          VALUES ("${user.id}","${user.name}", "${user.given_name}","${user.family_name}","${user.picture}","${user.locale}","${code}");`
        //execute sql query 
        con.query(sql, ((error, result) => {
          if (error) {
            // console.log("user exists! adding points..")
            let points = 1;
             //prepare sql query 
            var sql = `UPDATE user SET points = points + ${points} where id=${user.id};`
            //execute sql query 
            con.query(sql, ((error, result) => {
              if (error){
                console.log("update points failed",error)
              }else{
                console.log("1 point added to "+ user.name)
              }
            }))

          }else{
            console.log("user added!")
          }
        }))
        res.send(result.data)
      }
    });

})


exports.updatePoints = async (req, res, next) => {
  //connect database
  var con = mysql.createConnection(mysql_credentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  //take user body 
  const points = req.body.points
  const id = req.body.id

  //prepare sql query 
  var sql = `UPDATE user SET points = points + ${points} where id=${id};`

  //execute sql query 
  con.query(sql, ((error, result) => {
    if (error) throw error;
    console.log(result)
  }))


  res.status(200).json({
    message: "points updated !"
  })
}



exports.addWatchHistory = async (req, res, next) => {
  oauth2Client.credentials = queryToObj(req.query)
  
  //connect database
  var con = mysql.createConnection(mysql_credentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  var oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2'
  });
  oauth2.userinfo.get(
    function (err, result) {
      if (err) {
        console.log("err ",err)
        res.send(err)
      } else {
        let user_id = result.data.id
        let video_id = req.query.video_id

        //prepare sql query 
        var sql = `INSERT INTO watch_history(video_id, user_id) VALUES('${video_id}','${user_id}');`

        //execute sql query 
        con.query(sql, ((error, result) => {
          if (error) {
            res.send("failed to update history")
            console.log("failed to update history",error)
          }else{
            console.log("history updated!")
            res.send("history updated!")
          }
        }))
        
      }
    });
}

exports.getUsers = async (req, res, next) => {
  oauth2Client.credentials = queryToObj(req.query)
  
  //connect database
  var con = mysql.createConnection(mysql_credentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

        //prepare sql query 
        var sql = `SELECT picture,name from user ORDER BY points desc LIMIT 3;`

        //execute sql query 
        con.query(sql, ((error, result) => {
          if (error) {
            res.send("failed")
            console.log("failed!!!!!",error)
          }else{
            console.log(result)
            res.status(200).send(result)
          }
        }))
        
}

exports.getRegionCode = async (req, res, next) => {

}

exports.addLikeHistory = async (req, res, next) => {
  oauth2Client.credentials = queryToObj(req.query)
  
  var con = mysql.createConnection(mysql_credentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  var oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2'
  });
  oauth2.userinfo.get(
    function (err, result) {
      if (err) {
        console.log("err ",err)
        res.send(err)
      } else {
        let user_id = result.data.id
        let video_id = req.query.video_id

        var sql = `INSERT INTO likes_history(video_id, user_id) VALUES('${video_id}','${user_id}');`

        
        con.query(sql, ((error, result) => {
          if (error) {
            res.send("failed to update history")
            console.log("failed to update history",error)
          }else{
            console.log("history updated!")
            res.send("history updated!")
          }
        }))
        
      }
    });
}




