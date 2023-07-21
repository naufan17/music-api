const Songs = require('../models/Song');

// Get All Song
exports.getAllSongs = (req, res) => { 
    res.status(200).json(Songs);
}

// Search Song by Title
exports.searchSongs = (req, res) => {
    const { title } = req.query;

    const songLists = Songs.songs.filter(song => song.title.toLowerCase().includes(title.toLowerCase()));
    
    res.status(200).json(songLists);
}

// Play Song by Title
exports.playSongs = (req, res) => {
    const { title } = req.query;

    const songLists = Songs.songs.filter(song => song.title.toLowerCase().includes(title.toLowerCase()));

    songLists[0].playCount++;
    
    res.status(200).json({ message: 'Song is now playing.', songLists });
}

// Get Most Played Song
exports.mostPlayedSongs = (req, res) => {
    const songLists = Songs.songs.sort((song1, song2) => song2.playCount - song1.playCount);
    
    res.status(200).send(songLists);
}

// Add Song
exports.createSong = (req, res) => {
    const { title, artists, album, duration, url } = req.body;
    
    const song = { title, artists, album, duration, url, playCount: 0 };

    Songs.songs.push(song);

    res.status(201).json({ message: 'Song added successfully', song });
}