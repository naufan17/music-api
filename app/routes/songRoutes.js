const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

router.get('/songs', songController.getAllSong)
router.get('/songs/most-played', songController.getMostPlayedSong)
router.get('/songs/:song_id', songController.getOneSong)
router.get('/songs/:song_id/play', songController.playSong)
router.post('/songs', songController.createSong)

module.exports = router;