//Include Twitter NPM package
var Twitter = require("twitter");

//Variable containing Twitter keys
var keys = require("./keys.js");

var client = new Twitter({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token_key: keys.access_token_key,
	access_token_secret: keys.access_token_secret
});

//Variables to contain commands
var operation = process.argv[2];
var value = process.argv[3];

//Twitter call
if (operation === "my-tweets") {
	console.log("Here are your last 20 tweets!");
	var params = {screen_name: 'LiriHavoc'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log("A");
			for (i = 0; i < 20; i++){
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
			}
		}
	});
}
//Spotify call
else if (operation === "spotify-this-song") {
	console.log("Here is the song information.");
}
//OMDB call
else if (operation === "movie-this") {
	console.log("Here is the movie information.");
}
//Random call
else if (operation === "do-what-it-says"){
	console.log("Something random!");
}