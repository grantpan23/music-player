const express = require('express');
let router = express.Router();
const Fuse = require('fuse.js');
const expressSanitizer = require('express-sanitizer');
const lists = require('../db/lists.json');
const tracks = require('../db/raw_tracks.json');

router.use(express.json());
router.use(expressSanitizer());

//3.b. search by artist, genre, or track title
router.get('/search', (req,res) => {
    const artistSearch = req.sanitize(req.body.artistSearch) || null;
    const genreSearch = req.sanitize(req.body.genreSearch) || null;
    const titleSearch = req.sanitize(req.body.titleSearch) || null;
    let output = [];

    if(titleSearch){
        output = searchTracks(titleSearch,"track_title", tracks);
        if(genreSearch){
            output = searchTracks(genreSearch,"track_genres", output);
        }
        if(artistSearch){
            output = searchTracks(artistSearch,"artist_name",output);
        }
    } else if(genreSearch){
        output = searchTracks(genreSearch,"track_genres", tracks);
        if(artistSearch){
            output = searchTracks(artistSearch,"artist_name",output);
        }
    } else if(artistSearch){
        output = searchTracks(artistSearch,"artist_name", tracks);
    } else {
        res.status(400).send(`Invalid search.`);
    }

    res.send(output);
})

//3.f. list public playlists
router.get('/public-playlists', (req,res) => {
    let publicPlaylists = [];

    for(var i=0;i<lists.length;i++){
        if(publicPlaylists.length >= 10) break; 
        let currentList = lists[i];
        if(currentList.visibility == 'public') publicPlaylists.push(currentList);
    }

    const sortedPublicPlaylists = publicPlaylists.sort((a,b) => {
        var c = new Date(a.lastModified);
        var d = new Date(b.lastModified);
        return c-d;
    });

    res.send(sortedPublicPlaylists);
})

//3.g-h. get detailed track info

//helper functions
function searchTracks(searchTerm,key,data){
    const fuse = new Fuse(data, {
        //adjust if needed
        isCaseSensitive: false,
        threshold: 0.3,
        ignoreLocation: true,
        keys: [key]
    });
    const wrapped = fuse.search(searchTerm);
    let unwrapped = [];
    wrapped.forEach(e => {
        unwrapped.push(e.item);
    });
    return unwrapped;
}

module.exports = router;
