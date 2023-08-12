const Playlists = require('../models/Playlist');
const Songs = require('../models/Song');
  
exports.getAllPlaylist = (req, res) => {
    const reqTitle  = req.query.title;

    if(reqTitle && reqTitle.trim() !== '') {
        const playLists = Playlists.playlists.filter(playlist => playlist.title.toLowerCase().includes(reqTitle.toLowerCase()));

        if(playLists.length > 0){
            res.status(200).json({ playlists: playLists });
        } else {
            res.status(400).json({ mesage: 'Playlist not found' });
        }
    } else {
        if(Playlists.playlists.length > 0){
            res.status(200).json(Playlists);
        } else {
            res.status(400).json({ mesage: 'Playlist not found' });
        }
    }        
}

exports.getSongPlaylist = (req, res) => {
    const { playlist_id } = req.params;

    const playLists = Playlists.playlists.filter(playlist => playlist.playlist_id === playlist_id);
    
    if(playLists.length > 0){
        res.status(200).json(playLists);
    } else {
        res.status(400).json({ mesage: 'Playlist not found' });
    }
}

exports.createPlaylist = (req, res) => {
    const isEmpty = ![req.body.title].every(body => !body || Object.keys(body).length === 0);

    if(isEmpty) {
        const { title } = req.body;
    
        const playlist = { title, song: [] };
    
        Playlists.playlists.push(playlist);
    
        res.status(201).json({ message: 'Playlist created successfully', playlist });    
    } else {
        res.status(400).json({ mesage: 'Request body playlist not fully completed' });
    }
}

exports.addSongPlaylist = (req, res) => {
    const { playlist_id, song_id } = req.params;

    const songList = Songs.songs.filter(song => song.song_id.toLowerCase().includes(song_id.toLowerCase()));

    const playList = Playlists.playlists.filter(playlist => playlist.playlist_id.toLowerCase().includes(playlist_id.toLowerCase()));

    playList[0].song.push(songList[0]);
    
    res.status(201).json({ message: 'Song added to playlist successfully.', playList });
}

exports.deleteSongPlaylist = (req, res) => {
    const { playlist_id, song_id } = req.params;

    const playList = Playlists.playlists.filter(playlist => playlist.playlist_id.toLowerCase().includes(playlist_id.toLowerCase()));

    const index = Playlists.playlists[0].song.findIndex(song => song.song_id.toLowerCase().includes(song_id.toLowerCase()));

    playList[0].song.splice(index, 1);

    console.log(playList[0].song)
    
    res.status(200).json({ message: 'Song deleted in playlist successfully.', playList });
}