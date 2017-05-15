var express = require('express');
var app = express();
var fs = require('fs');

// Google APIs
var googleAuth = require('google-auth-library');
global.google = require('googleapis');

// Cache
global.storage = require('node-persist');
// Initialize storage for cache
var storageInit = require("./controllers/storageInit.js");
storageInit.init(storage);

// Scope for calendar api
global.SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// Read client_secret.json for the application to get credentials
var content = fs.readFileSync('client_secret.json');
var credentials = JSON.parse(content);

// Create new oauth2 client
var createoAuth2Client = require('./controllers/createoAuth2Client.js')
global.oauth2Client = createoAuth2Client.create(credentials, googleAuth);
 
// Functions for routes
var index = require('./routeFunctions/index')
var calendarEvents = require('./routeFunctions/calendarEvents')
var oauth = require('./routeFunctions/oauth2Client')

// GET routes
// home page
app.get('/', index.redirect);
// get events
app.get('/calendar-events', calendarEvents.find);
// auth callback to get authorization code
app.get('/oauthCallback', oauth.auth); 

app.listen(3007, function () {
    console.log('Example app listening on port 3007!');
    console.log('http://localhost:3007/');
});
