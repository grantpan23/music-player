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
            newPlaylist.averageRating = 'No ratings yet'
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
                    list.description = listUpdate.description;
                }
            });

            fs.writeFileSync(path.resolve(__dirname, '../db/lists.json'), JSON.stringify(data));
            res.send(listUpdate);
        }
    })
    .delete((req,res) => {
        const uName = req.sanitize(req.params.username);
        const userPlaylists = getUserPlaylists(uName);
        const pName = req.sanitize(req.params.playlistName);

        if(!isValidString(pName)){
            res.status(400).send(`Playlist name is in invalid format.`);
        } 
        else if(!playlistNameExists(userPlaylists,pName)){
            res.status(400).send(`Playlist with name ${pName} was not found.`)
        }
        else{
            let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../db/lists.json')));
            for(var i=0;i<data.length;i++){
                currentList = data[i];
                if(currentList.name == pName){
                    data.splice(i, 1);
                    res.send(currentList);
                    fs.writeFileSync(path.resolve(__dirname, '../db/lists.json'), JSON.stringify(data));
                } 
            }
        }
    });


//4.e. add review
router.put(`/:username/:playlistName/create-review`, (req,res) =>{
    const uName = req.sanitize(req.params.username);
    const userPlaylists = getUserPlaylists(uName);
    const pName = req.sanitize(req.params.playlistName);
    const newReview = req.body;
    let publicUserPlaylists = [];

    userPlaylists.forEach(list => {
        if(list.visibility == "public") publicUserPlaylists.push(list);
    });

    if(!playlistNameExists(publicUserPlaylists,pName)){
        res.status(400).send('Playlist name does not exist');
    } else if(!(isValidString(newReview.comment) && isValidRating(newReview.rating))) {
        res.status(400).send(`Invalid rating.`);
    } else{
        newReview.hidden = false;
        let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../db/lists.json')));
        data.forEach(list => {
            if(list.name == pName && list.creator == uName){
                list.reviews.push(newReview); 
                list.averageRating = calculateAverageRating(list.reviews);
            }
        });
        fs.writeFileSync(path.resolve(__dirname, '../db/lists.json'), JSON.stringify(data));
        res.send(newReview);
    }
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

function isValidRating(r){
    return (r === parseInt(r,10)) && r>=1 && r<=5;
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

function calculateAverageRating(reviews){
    let total = 0, count = 0;
    reviews.forEach(review => {
        if(!review.hidden){
            total += review.rating;
            count++;
        } 
    });
    return (total/count).toFixed(1);
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
