require("dotenv").config();

var keys = require("./keys.js");
let Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
let axios = require("axios");
let moment = require("moment");
let fs = require("fs");

const search = process.argv[2]

const term = process.argv.slice(3).join(" ")
console.log(term)

function spotifyThis(songName) {
    spotify.search({
        type: "track",
        query: term,
    }, function (error, results) {
        // console.log(results.tracks.items[0]);
        console.log("----------------------------------------------")
        const songInfo = results.tracks.items[0];
        console.log(`Artist Name: ${songInfo.artists[0].name}`);
        console.log("----------------------------------------------")
        console.log(`Song: ${songInfo.name}`);
        console.log("----------------------------------------------")
        // console.log(songinfo.external_urls.spotify.value); --- need help displaying object 
        // within object that has a URL.
        console.log(`Album: ${songInfo.album.name}`);
        console.log("----------------------------------------------")
        // display code "The Sign" by Ace of Base if no input -- need help
        // const userInput = search.value;
        // if (userInput === 0) {
        //     console.log("The Sign by Ace of Base")
        // }

    })


}

if (search === "spotify-this-song") {
    spotifyThis(term);
} else if (search === "concert-this") {
    getBand(term);
} else if (search === "movie-this") {
    getMovie(term);
} else if (search === "do-what-it-says") {
    doWhatitsays();
}


function getBand(band) {
    var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

    axios.get(URL).then(
        function (response) {
            const artist = response.data;
            if (artist.length === 0) {
                console.log(`${band} is not touring.`)
            } else {
                for (var i = 0; i < artist.length; i++) {
                    console.log("----------------------------------------------")
                    console.log("Concert Venue: " + artist[i].venue.name);
                    console.log("Location: " + artist[i].venue.city);
                    console.log("Date: " + moment(artist[i].datetime).format('MMM DD, YYYY'));
                    console.log("----------------------------------------------")
                }
            }

        }

    ).catch(
        function (error) {
            console.log(error)
        }
    )



};

function getMovie(movie) {
    const omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
    axios.get(omdbURL).then(
        function (response) {
            const myMovie = response.data;
            console.log("----------------------------------------------")
            console.log(`Title: ${myMovie.Title}`);
            console.log("----------------------------------------------")
            console.log(`Year: ${myMovie.Year}`);
            console.log("----------------------------------------------")
            console.log(`IMDB Rating: ${myMovie.imdbRating}`);
            console.log("----------------------------------------------")
            console.log(`Rotten Tomatoes Rating: ${myMovie.Ratings[1].Value}`)
            console.log("----------------------------------------------")
            console.log(`Country: ${myMovie.Country}`);
            console.log("----------------------------------------------")
            console.log(`Language(s): ${myMovie.Language}`);
            console.log("----------------------------------------------")
            console.log(`Plot: ${myMovie.Plot}`);
            console.log("----------------------------------------------")
            console.log(`Actors: ${myMovie.Actors}`);
        }
    ).catch(
        function (error) {
            console.log(error)
            // need to output for Mr. Nobody if no data --- need help.
        }
    )
}

// function doWhatitsays() {
//     fs.readFile("random.txt", "utf8", function(error, data) {
//         if (err) {
//         return console.log(error);
//         }
//         // spotifyThis(songName)
//         var dataArr = data.split(",");

//         txtFile = dataArr[0];
//         song = dataArr[1];
//         switchCase(txtfile, song);

//     });
// }

function doWhatitsays() {
    //read the file random.txt
    fs.readFile("random.txt", "utf8", function (err, data) {
      if (err) {
        return console.log(error);
      }
      //catch data and split to separate objects in new array
      var dataArr = data.split(",");
   
      //take objects from random.txt to pass in as parameters
      txtFile = dataArr[0];
      song = dataArr[1];
      switchCase(txtFile, song);
    });
   };