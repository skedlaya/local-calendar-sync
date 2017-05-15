// Get access token from oauth2client from the code provided by the google API
exports.auth = function(req, res){
  var code = req.query.code;
  // Store access token in credentials
  oauth2Client.getToken(code, function(err, token) {
	  if (err) {
	    console.log('Error while trying to retrieve access token', err);
	    return;
	  }
	  oauth2Client.credentials = token;
	  oauth2Client.setCredentials(token);	
	  // Redirect to get events  
	  res.redirect('/calendar-events?startDate=2017-05-14T03:36:22.321Z&endDate=null');
  });
}
