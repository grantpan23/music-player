const express = require('express');
const router = express.Router();
const expressSanitizer = require('express-sanitizer');
const lists = require('../db/lists.json');
const fs = require('fs');
const path = require('path');

router.use(express.json());
router.use(expressSanitizer());

//5.c. mark review as hidden
router.post(`/:adminName/:playlistName/:creatorName/reviews/:reviewerName/change-hidden`, (req,res) => {
    const hiddenStatus = req.body.hidden; //sanitize later
    const pName = req.sanitize(req.params.playlistName);
    const cName = req.sanitize(req.params.creatorName);
    const rName = req.sanitize(req.params.reviewerName);
    const rTime = req.sanitize(req.body.dateTime);

    const creatorPlaylists = getUserPlaylists(cName);
    const reviewPlaylist = creatorPlaylists.filter(
        (playlist) => {
            return playlist.name == pName;
        }
    )[0];
    const review = getReview(reviewPlaylist.reviews,rName,rTime);

    if(typeof hiddenStatus != 'boolean'){
        res.status(400).send(`Must receive boolean value.`)
    } else if(!playlistNameExists(creatorPlaylists,pName)){
        res.status(400).send(`Playlist not found.`)
    } else if (!review){
        res.status(400).send(`Review not found`)
    } else {
        let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../db/lists.json')));
        let changedReview;
        data.forEach(list => {
            if(list.name == pName && list.creator == cName){
                list.reviews.forEach(review => {
                    if(review.username == rName && review.dateTime == rTime){
                        review.hidden = Boolean(hiddenStatus);
                        changedReview = review;
                        list.averageRating = calculateAverageRating(list.reviews);
                    } 
                });
            }
        });
        fs.writeFileSync(path.resolve(__dirname, '../db/lists.json'), JSON.stringify(data));
        res.send(changedReview);
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

function getReview(reviews,rName,rTime){
    return reviews.filter(
        (review) => {
            return review.username == rName && review.dateTime == rTime;
        }
    )[0];
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

module.exports = router;
