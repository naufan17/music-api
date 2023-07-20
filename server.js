const express = require('express');
const bodyParser = require('body-parser');
const Songs = require('./models/Song');
const Playlists = require('./models/Playlist');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Add Song
app.post('/song', (req, res) => {
    const { title, artists, album, duration, url } = req.body;
    
    const song = { title, artists, album, duration, url, playCount: 0 };

    Songs.songs.push(song);

    res.status(201).json({ message: 'Song added successfully', song });
});

// Get All Song
app.get('/songs', (req, res) => { 
    res.status(200).json(Songs);
});

// Search Song by Title
app.get('/songs/search', (req, res) => { 
    const { title } = req.query;

    const songLists = Songs.songs.filter(song => song.title.toLowerCase().includes(title.toLowerCase()));
    
    res.status(200).json(songLists);
});

// Get Most Played Song
app.get('/songs/most-played', (req, res) => {
    const songLists = Songs.songs.sort((song1, song2) => song2.playCount - song1.playCount);
    
    res.status(200).send(songLists);
});
  
// Add Playlist
app.post('/playlist', (req, res) => {
    const { title } = req.body;
    
    const playlist = { title, song: [] };

    Playlists.playlists.push(playlist);

    res.status(201).json({ message: 'Playlist added successfully', playlist });
});

// Get all playlists with song
app.get('/playlists', (req, res) => {
    res.json(Playlists.playlists);
});

// Add Song to Playlist
app.post('/playlist/song', (req, res) => { 
    const { titleSong, titlePlaylist } = req.body;

    const songList = Songs.songs.filter(song => song.title.toLowerCase().includes(titleSong.toLowerCase()));

    const playList = Playlists.playlists.filter(playlist => playlist.title.toLowerCase().includes(titlePlaylist.toLowerCase()));

    const index = Playlists.playlists.findIndex(playlist => playlist.title.toLowerCase().includes(titlePlaylist.toLowerCase()));

    playList[index].song.push(songList[0]);
    
    res.status(200).json( Playlists.playlists );
});

// Get all song in playlist
app.get('/playlist/songs', (req, res) => { 
    const { title } = req.query;

    const playLists = Playlists.playlists.filter(playlist => playlist.title.toLowerCase().includes(title.toLowerCase()));
    
    res.status(200).json(playLists);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
