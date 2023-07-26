const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

router.get('/songs', songController.getAllSong)
router.get('/songs/search', songController.searchSong)
router.get('/songs/play', songController.playSong)
router.get('/songs/most-played', songController.mostPlayedSong)
router.post('/songs', songController.createSong)

module.exports = router;