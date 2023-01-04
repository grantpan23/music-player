const express = require('express');
let router = express.Router();

const lists = require('../db/lists.json');

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

module.exports = router;
