const Songs = require('../models/Song');

exports.getAllSong = (req, res) => { 
    const reqTitle  = req.query.title;

    if(reqTitle && reqTitle.trim() !== '') {
        const songLists = Songs.songs.filter(song => song.title.toLowerCase().includes(reqTitle.toLowerCase()));
    
        if(songLists.length > 0){
            res.status(200).header("Access-Control-Allow-Origin", "*").json({ songs: songLists });
        } else {
            res.status(404).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Song not found' });
        }
    } else {
        if(Songs.songs.length > 0){
            res.status(200).header("Access-Control-Allow-Origin", "*").json(Songs);
        } else {
            res.status(404).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Song not found' });
        }
    }
}

exports.getMostPlayedSong = (req, res) => {
    const songLists = Songs.songs.sort((song1, song2) => song2.playCount - song1.playCount);
    
    if(songLists.length > 0){
        res.status(200).header("Access-Control-Allow-Origin", "*").json({ songs: songLists });
    } else {
        res.status(404).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Song not found' });
    }
}

exports.getOneSong = (req, res) => {
    const { song_id } = req.params;

    const songLists = Songs.songs.filter(song => song.song_id === song_id);

    if(songLists.length > 0){
        res.status(200).header("Access-Control-Allow-Origin", "*").json({ song: songLists });
    } else {
        res.status(404).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Song not found' });
    }
}

exports.playSong = (req, res) => {
    const { song_id } = req.params;

    const songLists = Songs.songs.filter(song => song.song_id === song_id);

    songLists[0].playCount++;
    
    if(songLists.length > 0){
        res.status(200).header("Access-Control-Allow-Origin", "*").json({ message: 'Song is now playing.', song: songLists });
    } else {
        res.status(404).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Song not found' });
    }
}

exports.createSong = (req, res) => {
    const isEmpty = ![req.body.title, req.body.artists, req.body.album, req.body.duration, req.body.url].every(body => !body || Object.keys(body).length === 0);

    if(isEmpty) {
        const { title, artists, album, duration, url } = req.body;
    
        const song = { title, artists, album, duration, url, playCount: 0 };
    
        Songs.songs.push(song);
    
        res.status(201).header("Access-Control-Allow-Origin", "*").json({ message: 'Song added successfully', song });    
    } else {
        res.status(404).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Request body song not fully completed' });
    }
}