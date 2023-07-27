const Playlists = require('../models/Playlist');
const Songs = require('../models/Song');
  
exports.getAllPlaylist = (req, res) => {
    const reqTitle  = req.query.title;

    if(reqTitle && reqTitle.trim() !== '') {
        const playLists = Playlists.playlists.filter(playlist => playlist.title.toLowerCase().includes(reqTitle.toLowerCase()));

        if(playLists.length > 0){
            res.status(200).header("Access-Control-Allow-Origin", "*").json({ playlists: playLists });
        } else {
            res.status(400).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Playlist not found' });
        }
    } else {
        if(Playlists.playlists.length > 0){
            res.status(200).header("Access-Control-Allow-Origin", "*").json(Playlists);
        } else {
            res.status(400).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Playlist not found' });
        }
    }        
}

exports.getSongPlaylist = (req, res) => {
    const { playlist_id } = req.params;

    const playLists = Playlists.playlists.filter(playlist => playlist.playlist_id === playlist_id);
    
    if(playLists.length > 0){
        res.status(200).header("Access-Control-Allow-Origin", "*").json(playLists);
    } else {
        res.status(400).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Playlist not found' });
    }
}

exports.createPlaylist = (req, res) => {
    const isEmpty = ![req.body.title].every(body => !body || Object.keys(body).length === 0);

    if(isEmpty) {
        const { title } = req.body;
    
        const playlist = { title, song: [] };
    
        Playlists.playlists.push(playlist);
    
        res.status(201).header("Access-Control-Allow-Origin", "*").json({ message: 'Playlist created successfully', playlist });    
    } else {
        res.status(400).header("Access-Control-Allow-Origin", "*").json({ mesage: 'Request body playlist not fully completed' });
    }
}

exports.addSongPlaylist = (req, res) => {
    const { titleSong, titlePlaylist } = req.body;

    const songList = Songs.songs.filter(song => song.title.toLowerCase().includes(titleSong.toLowerCase()));

    const playList = Playlists.playlists.filter(playlist => playlist.title.toLowerCase().includes(titlePlaylist.toLowerCase()));

    const index = Playlists.playlists.findIndex(playlist => playlist.title.toLowerCase().includes(titlePlaylist.toLowerCase()));

    playList[index].song.push(songList[0]);
    
    res.status(200).header("Access-Control-Allow-Origin", "*").json({ message: 'Song added to playlist successfully.', playList });
}