// Create an oAuth2Client from the credentials
module.exports = {
	create: function(credentials, googleAuth) {
		var clientSecret = credentials.installed.client_secret;
		var clientId = credentials.installed.client_id;
		var redirectUrl = credentials.installed.redirect_uris[0];
		var auth = new googleAuth();
		return new auth.OAuth2(clientId, clientSecret, redirectUrl);
    }
};