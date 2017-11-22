//Include Twitter NPM package
var Twitter = require("twitter");

//Include Spotify NPM package
var Spotify = require('node-spotify-api');

// Include the request NPM package
var request = require("request");

var spotify = new Spotify({
	id: 'f8dca6b84e7c4de1888cef30cd5ef9be',
	secret: 'c351e67dcf694da0b369f7eaf8dac7e7'
});

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

//Captures entire argument as one string
for (i = 4; i < process.argv.length; i++) {

  // Build a string with the address.
  value = value + " " + process.argv[i];
}

//Twitter command
if (operation === "my-tweets") {
	console.log("Here are your last 20 tweets!");
	var params = {screen_name: 'LiriHavoc'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log("A");
			for (i = 0; i < 3; i++){
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
			}
		}
	});
}

//Spotify command
else if (operation === "spotify-this-song") {
	console.log("Here is the song information.");
	spotify.search({ type: 'track', query: value, limit: 1 }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		//Logs the artist name
		console.log("===Artist===\n", data.tracks.items[0].album.artists[0].name);
		//Logs the song name
		console.log("===Song===\n", data.tracks.items[0].name);
		//Logs the song URL
		console.log("===Preview===");
		if (data.tracks.items[0].preview_url === null) {
			console.log("Sorry, there is not a preview available for that track.")
		}else {
			console.log(data.tracks.items[0].preview_url);
		}
		//Logs the album
		console.log("===Album===\n", data.tracks.items[0].album.name);
	});
}
//OMDB command
else if (operation === "movie-this") {
	console.log("Here is the movie information.");
	// Run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
  	var omdbData = JSON.parse(body);
  	//Log movie title...
    console.log("===Title===\n", omdbData.Title);
    //...year released...
    console.log("===Released===\n", omdbData.Released);
    //...IMDB rating...
    console.log("===IMDB Rating===\n", omdbData.imdbRating);
    //...Rotten Tomatoes Rating...
    console.log("===Rotten Tomatoes Rating===\n", omdbData.Ratings[1].Value);
    //...Country...
    console.log("===Country===\n", omdbData.Country);
    //...Language...
    console.log("===Language===\n", omdbData.Language);
    //...Plot...
    console.log("===Plot===\n", omdbData.Plot);
    //...Actors...
    console.log("===Actors===\n", omdbData.Actors);
}
});

}
//Random command
else if (operation === "do-what-it-says"){
	console.log("Something random!");
}
//Inform user of error and list possible options
else {
	console.log("Not a valid command.  Please enter one of the following...\n my-tweets\n spotify-this-song <song>\n movie-this <movie>\n do-what-it-says");
}