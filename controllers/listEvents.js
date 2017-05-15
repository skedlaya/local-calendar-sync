// Does authorization if credentials are not available.
// If credentials are available, gets events from google API and stores them in cache.
module.exports = {
	list: function(auth,res) {
	  // Calendar object
	  var calendar = google.calendar('v3');
      // Paramters to get events from google API
	  var listObj = {
	    auth: auth,
	    calendarId: 'primary',
	    singleEvents: true,
	    orderBy: 'startTime'
	  };
	  // Get events
	  calendar.events.list(
	  listObj, function(err, response) {
	    if (err) {
	      // Authorization using oAuth2.0
	      var authUrl = oauth2Client.generateAuthUrl({
	      access_type: 'offline',
	      scope: SCOPES
	      });
	      console.log('Authorization..');
	      res.redirect(authUrl);
	      return;
	    }
	    // Store retrieved events in cache
	    storage.setItem( "myKey", response, function( err, success ){
	      if(err){
	        console.log("Error writing to cache" );
	      }

	    });
	  });
	    
    }
};