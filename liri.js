console.log("is this thing on?");

require("dotenv").config();
var Twitter = require('twitter');
var keys = require('./keys.js');
var Spotify = require("node-spotify-api")
var request = require("request");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var action = process.argv[2];
var userChoice= process.argv[3];
run();

function run(){
switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatSay();
        break;
}
}

function myTweets() {

    var params = { screen_name: 'prince' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; 1 < 19 && i < tweets.length; i++) {

                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                
            }


        }
    });
}
function spotifySong() {
if (!userChoice) {

    userChoice = "the sign by ace of base"
}

    spotify.search({ type: 'track', query: userChoice }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // need to code is no song default to ace of base
        var data = data.tracks.items[0];
        console.log(data.artists[0].name);
        console.log(data.name);
        console.log(data.preview_url);
        console.log(data.album.name);
        
        
    });
}

function movieThis() {

    if (!userChoice) {

        userChoice = "mr nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        body = JSON.parse(body)
        if (!error && response.statusCode === 200) {
            // console.log(body);
            console.log("Title: " + (body).Title);
            console.log("Year: " + (body).Year);
            console.log("IMDB Rating: " + (body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + (body).Ratings[2].Value);
            console.log("Country: " + (body).Country);
            console.log("Language: " + (body).Language);
            console.log("Plot: " + (body).Plot);
            console.log("Actors: " + (body).Actors);
        };
    });
};

function doWhatSay() {

    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
           return  console.log(error)
        }
    data = data.split(",");
    action = data[0];
    userChoice = data[1];

    run();
    });
}

