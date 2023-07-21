const Playlists = require('../models/Playlist');
  
// Get all playlists with song
exports.getAllPlaylists = (req, res) => {
    res.json(Playlists.playlists);
}

// Get all song in playlist
exports.getSongPlaylists = (req, res) => {
    const { title } = req.query;

    const playLists = Playlists.playlists.filter(playlist => playlist.title.toLowerCase().includes(title.toLowerCase()));
    
    res.status(200).json(playLists);
}

// Add Playlist
exports.createPlaylist = (req, res) => {
    const { title } = req.body;
    
    const playlist = { title, song: [] };

    Playlists.playlists.push(playlist);

    res.status(201).json({ message: 'Playlist created successfully', playlist });
}

// Add Song to Playlist
exports.addSongPlaylist = (req, res) => {
    const { titleSong, titlePlaylist } = req.body;

    const songList = Songs.songs.filter(song => song.title.toLowerCase().includes(titleSong.toLowerCase()));

    const playList = Playlists.playlists.filter(playlist => playlist.title.toLowerCase().includes(titlePlaylist.toLowerCase()));

    const index = Playlists.playlists.findIndex(playlist => playlist.title.toLowerCase().includes(titlePlaylist.toLowerCase()));

    playList[index].song.push(songList[0]);
    
    res.status(200).json({ message: 'Song added to playlist successfully.', playList });
}