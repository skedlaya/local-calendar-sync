// Function to get events given start date and end date as query parameters
var listEvents = require("../controllers/listEvents.js");
exports.find = function(req, res){
	// query parameters
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    // JSON structure as response
    var data = {
      "status": 200,
      "query": {
         "startDate": startDate,
         "endDate": endDate,
      },
      "results" : {
        "events" : []
      }
    }
    // Check if data is there in the cache
    storage.getItem( "myKey", function( err, value ){
    if( !err ){
      // If cache has expired, reacquire events from the google API.
      if(value == undefined){
        listEvents.list(oauth2Client, res);
      }
      // If events present in cache
      else{
      	// Only add events that satisfy query parameters.
        var events = value.items;
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var eventstartDate = new Date(event.start.dateTime || event.start.date);
          var diffDateTime = 0;
          if(startDate !=  'null'){
            diffDateTime += eventstartDate - new Date(startDate);
          }
          if(endDate != 'null'){
            diffDateTime += new Date(startDate) - eventstartDate;
          }
          if(diffDateTime >= 0){
            data["results"]["events"].push(event);
          }

        }
        // send JSON response
        res.json(data);
      }
    }
  });
}
