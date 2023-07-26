const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.get('/playlists', playlistController.getAllPlaylist)
router.get('/playlists/songs', playlistController.getSongPlaylist)
router.post('/playlists', playlistController.createPlaylist)
router.post('/playlists/song', playlistController.addSongPlaylist)
  
module.exports = router;