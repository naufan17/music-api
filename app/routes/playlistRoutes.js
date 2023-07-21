const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.get('/playlists', playlistController.getAllPlaylists)
router.get('/playlists/songs', playlistController.getSongPlaylists)
router.post('/playlist', playlistController.createPlaylist)
router.post('/playlist', playlistController.addSongPlaylist)
  
module.exports = router;