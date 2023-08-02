const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.get('/playlists', playlistController.getAllPlaylist)
router.get('/playlists/:playlist_id', playlistController.getSongPlaylist)

router.post('/playlists', playlistController.createPlaylist)
router.post('/playlists/:playlist_id/song/:song_id', playlistController.addSongPlaylist)
router.delete('/playlists/:playlist_id/song/:song_id', playlistController.deleteSongPlaylist)
  
module.exports = router;