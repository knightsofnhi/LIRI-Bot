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
        const songInfo = results.tracks.items[0];
        console.log(`Artist Name: ${songInfo.artists[0].name}`);
        console.log(`Song: ${songInfo.name}`);
        // console.log(songinfo.external_urls.spotify.value);
        console.log(`Album: ${songInfo.album.name}`);
        
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
            console.log(myMovie.Title);
            console.log(myMovie.Year);
            console.log(myMovie.imdbRating);
            console.log(myMovie.Ratings[1].Value)
            console.log(myMovie.Country);
            console.log(myMovie.Language);
            console.log(myMovie.Plot);
            console.log(myMovie.Actors);
        }
    ).catch(
        function (error) {
            console.log(error)
        }
    )
}

function doWhatitsays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        let fileContent = data.split(",");
        const searchTerm = fileContent[0];
        const searchItem = fileContent[1];
        
        if (searchTerm === "spotify-this-song") {
            console.log(searchItem);
            spotifyThis(searchItem.slice(1,-1));
            
        } else if (searchTerm === "concert-this") {
            getBand(searchItem);
        } else if (searchTerm === "movie-this") {
            getMovie(searchItem);
        } else if (searchTerm === "do-what-it-says") {
            doWhatitsays();
        }
    })
}