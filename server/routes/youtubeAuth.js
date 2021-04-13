var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;

const express = require('express');
const oauthRouter = express.Router();


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly','https://www.googleapis.com/auth/userinfo.profile'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

function getCreds() {
  const data = fs.readFileSync('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return
    } else {
      console.log("got creds")
    }
  })
  var credentials = JSON.parse(data);
  // Authorize a client with the loaded credentials, then call the YouTube API.
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  return { clientId, clientSecret, redirectUrl }

}
const { clientId, clientSecret, redirectUrl } = getCreds();

// IMPORTANT
// this route will be called by react with the code 
// react will take care of saving the token to the browser storage
oauthRouter.get('/authorize', (req, res) => {
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  let code = req.query.code;
  oauth2Client.getToken(code, function (err, token) {
    if (err) {
      // console.log('Error while trying to retrieve access token', err);
      return res.status(400).send({"msg":'Error while trying to retrieve access token'});
    }
    // storeToken(token);
    res.status(200).send({"token": token})
  });
})

oauthRouter.get('/', (req, res) => {
  res.send('ok')
})


/**
 * Get and store new token after prompting for user authorization, and then
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 */
function getNewToken(oauth2Client) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  return authUrl;
}



module.exports = {
  getCreds,
  getNewToken,
  clientSecret,
  clientId,
  redirectUrl,
  oauthRouter,
  SCOPES,
  oauth2Client : new OAuth2(clientId, clientSecret, redirectUrl),
  youtube : google.youtube('v3')

}
