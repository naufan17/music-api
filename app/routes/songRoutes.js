const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

router.get('/songs', songController.getAllSongs)
router.get('/songs/search', songController.searchSongs)
router.get('/songs/play', songController.playSongs)
router.get('/songs/most-played', songController.mostPlayedSongs)
router.post('/song', songController.createSong)

module.exports = router;