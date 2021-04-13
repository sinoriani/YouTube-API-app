
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { oauth2Client,youtube } = require('../routes/youtubeAuth');
const asyncHandler = require('../middleware/async')
const {queryToObj} = require("../utils/queryCredentials")
const mysql = require('mysql')
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

exports.createUser = async(req,res,next)=>{

  //connect database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "youtube_bd"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  
});

  //take user body 
 const user = req.body

  //prepare sql query 
  var sql = `INSERT INTO user(name,given_name,family_name,picture,locale)  
  VALUES ("${user.name}", "${user.given_name}","${user.family_name}","${user.picture}","${user.locale}");`
  //execute sql query 
  con.query(sql,((error,result)=>{
    if (error) throw error;
    console.log(result)
  }))
  //send response 
  res.status(201).json({
    message:"user created"
  })
}


exports.updatePoints = async(req,res,next)=>{
   //connect database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "youtube_bd"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//take user body 
const points = req.body.points
const id = +req.body.id

//prepare sql query 
var sql = `UPDATE user SET points = points + ${points} where id=${id};`  

//execute sql query 
con.query(sql,((error,result)=>{
  if (error) throw error;
  console.log(result)
}))


  res.status(200).json({
    message:"points updated !"
  })
}