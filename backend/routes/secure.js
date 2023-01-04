const express = require('express');
const expressSanitizer = require('express-sanitizer');
const router = express.Router();
const lists = require('../db/lists.json');
const tracks = require('../db/raw_tracks.json');
const fs = require('fs');
const path = require('path');

router.use(express.json());
router.use(expressSanitizer());

//4.a. show user playlists
router.get(`/:username/playlists`, (req,res) => {
    res.send(getUserPlaylists(req.params.username));
})

//4. a-d. playlist options
router
    .route(`/:username/:playlistName`)
    .put((req,res) => {
        const uName = req.sanitize(req.params.username);
        const userPlaylists = getUserPlaylists(uName);
        const pName = req.sanitize(req.params.playlistName);

        const newPlaylist = req.body;
        newPlaylist.name = pName;
        newPlaylist.creator = uName;

        if(!isValidRequest(newPlaylist)){
            res.status(400).send('Username and playlist name are required and must be in valid format.');
        } 
        else if(userPlaylists.length>=20 || playlistNameExists(userPlaylists,pName)){
            res.status(400).send('Maximum 20 playlists and playlist name must be unique.');
        }
        else{
            newPlaylist.reviews = [];
            addDynamicFields(newPlaylist);

            let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../db/lists.json')));
            data.push(newPlaylist);
            fs.writeFileSync(path.resolve(__dirname, '../db/lists.json'), JSON.stringify(data));
            res.send(newPlaylist);
        }
    })
    .post((req,res) => {
        const uName = req.sanitize(req.params.username);
        const userPlaylists = getUserPlaylists(uName);
        const pName = req.sanitize(req.params.playlistName);
        
        const listUpdate = req.body;
        listUpdate.creator = uName;

        if(!isValidRequest(listUpdate)){
            res.status(400).send('Username and playlist name are required and must be in valid format.');
        } 
        else if(!playlistNameExists(userPlaylists,pName)){
            res.status(400).send(`Playlist with name ${pName} does not exist.`);
        }
        else{
            addDynamicFields(listUpdate);

            let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../db/lists.json')));
            data.forEach(list => {
                if(pName == list.name){
                    list.name = listUpdate.name;
                    list.track_IDs = listUpdate.track_IDs;
                    list.visibility = listUpdate.visibility;
                    list.desciprtion = listUpdate.description;
                }
            });

            fs.writeFileSync(path.resolve(__dirname, '../db/lists.json'), JSON.stringify(data));
            res.send(listUpdate);
        }
    })
    .delete((req,res) => {
        //find playlist that matches username and playlist name
        //delete
    });


//4.e. add review
router.put(`/:playlistName/review`, (req,res) =>{

})

//helper functions
function getUserPlaylists(username){
    let output = [];
    lists.forEach(list => {
        if(username == list.creator) output.push(list);
    });
    return output;
}

function playlistNameExists(playlists, name){
    for(let i=0;i<playlists.length;i++){
        if(playlists[i].name == name) return true;
    }
    return false;
}

function isValidRequest(req){
    //check if the description exists; if it does and the string is not valid, return false. otherwise, check the others
    if(req.description && !isValidString(req.description)) return false;
    return req.creator && req.name && isValidString(req.name) && isValidString(req.creator) && onlyNumbers(req.track_IDs);
}

function isValidString(s){
    return /^[a-z0-9]+$/.test(s);
}

function onlyNumbers(arr){
    return arr.every(e => {
        return !isNaN(e);
      });
}

function calculatePlaytime(playlist){
    let ptSeconds = 0;
    playlistTracks = playlist.track_IDs;
    for(j=0;j<playlistTracks.length;j++){
        for(k=0;k<tracks.length;k++){
            if(playlistTracks[j] == tracks[k].track_id){
                ptSeconds += timeToSecs(tracks[k].track_duration);
            }
        }
    }
    return timeToMins(ptSeconds);
}

function timeToSecs(time){
    var t = time.split(':');
    return parseInt(t[0])*60 + parseInt(t[1]);
}

function timeToMins(secs){
    var m = String(secs/60);
    var s = String(secs%60).padStart(2,0);
    return Math.floor(m) + ':' + s;
}

function addDynamicFields(playlist){
    playlist.playtime = calculatePlaytime(playlist);
    playlist.noTracks = playlist.track_IDs.length;
    playlist.lastModified = new Date().toLocaleString();
}

module.exports = router;
