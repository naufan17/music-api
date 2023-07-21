const Songs = require('../models/Song');

// Get All Song
exports.getAllSongs = (req, res) => { 
    if(Songs.songs.length > 0){
        res.status(200).json(Songs.songs);
    } else {
        res.status(400).json({ mesage: 'Song not found' });
    }
}

// Search Song by Title
exports.searchSongs = (req, res) => {
    const { title } = req.query;

    const songLists = Songs.songs.filter(song => song.title.toLowerCase().includes(title.toLowerCase()));
    
    if(songLists.length > 0){
        res.status(200).json(songLists);
    } else {
        res.status(400).json({ mesage: 'Song not found' });
    }
}

// Play Song by Title
exports.playSongs = (req, res) => {
    const { title } = req.query;

    const songLists = Songs.songs.filter(song => song.title.toLowerCase().includes(title.toLowerCase()));

    songLists[0].playCount++;
    
    if(songLists.length > 0){
        res.status(200).json({ message: 'Song is now playing.', songLists });
    } else {
        res.status(400).json({ mesage: 'Song not found' });
    }
}

// Get Most Played Song
exports.mostPlayedSongs = (req, res) => {
    const songLists = Songs.songs.sort((song1, song2) => song2.playCount - song1.playCount);
    
    if(songLists.length > 0){
        res.status(200).send(songLists);
    } else {
        res.status(400).json({ mesage: 'Song not found' });
    }
}

// Add Song
exports.createSong = (req, res) => {
    const isEmpty = ![req.body.title, req.body.artists, req.body.album, req.body.duration, req.body.url].every(body => !body || Object.keys(body).length === 0);

    if(isEmpty) {
        const { title, artists, album, duration, url } = req.body;
    
        const song = { title, artists, album, duration, url, playCount: 0 };
    
        Songs.songs.push(song);
    
        res.status(201).json({ message: 'Song added successfully', song });    
    } else {
        res.status(400).json({ mesage: 'Request body song not fully completed' });
    }
}