const express = require('express');
let router = express.Router();

const lists = require('../db/lists.json');

router.get('/public-playlists', (req,res) => {
    let publicPlaylists = [];

    lists.forEach(list => {
      if(publicPlaylists.length >= 10) return;  
      if(list.visibility == 'public') publicPlaylists.push(list);  
    });

    const sortedPublicPlaylists = publicPlaylists.sort((a,b) => {
        var c = new Date(a.lastModified);
        var d = new Date(b.lastModified);
        return c-d;
    });

    res.send(sortedPublicPlaylists);
})

module.exports = router;
