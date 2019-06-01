require("dotenv").config();

var keys = require("./keys.js");
let Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

const search = process.argv[2]

const term = process.argv.slice(3).join(" ")
console.log(term)
// spotify.search({
//     type:"track",
//     query:term,
// },function(error, results){
//     console.log(results.tracks.items[0])
// })

function spotifyThis (songName) {
    spotify.search({
        type:"track",
        query:term,
    },function(error, results){
        console.log(results.tracks.items[0]);
        const songInfo = results.tracks.items[0];
        console.log(songInfo.album.name);
        console.log(songInfo.artists.name);
    })
}

if (search === "track") {
    spotifyThis(term);
}

const OMDBURL = "http://www.omdbapi.com/?apikey=trilogy&" + title;

axios.get("http://www.omdbapi.com/?apikey=trilogy&").then(
 function(response) {
   console.log(response);
 }
);
