const router = require('express').Router()
const artists = require('./artists')
const albums = require('./albums')
const songs = require('./songs')

router.use('/artists', artists)
router.use('/albums', albums)
router.use('/songs', songs)

module.exports = router
