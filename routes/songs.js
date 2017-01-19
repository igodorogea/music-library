const router = require('express').Router()
const Artist = require('../models').Artist
const Album = require('../models').Album
const Song = require('../models').Song

// list all songs
router.get('/', function (req, res) {
  Song
    .findAll({
      attributes: ['id', 'title', 'duration'], include: [{
        model: Album,
        attributes: ['title', 'year'],
        include: {
          model: Artist,
          attributes: ['name']
        }
      }]
    })
    .then(function (songs) {
      res.json(songs)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('list all songs failed')
    })
})

// show song
router.get('/:id', function (req, res) {
  Song
    .findById(req.params.id, {attributes: ['id', 'title', 'duration', 'albumId']})
    .then(function (song) {
      res.json(song)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('show song failed')
    })
})

// create song
router.post('/', function (req, res) {
  Song
    .create(req.body)
    .then(function (song) {
      res.location(req.baseUrl + '/' + song.get('id'))
      res.status(201).json(song)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('create song failed')
    })
})

// update song
router.put('/:id', function (req, res) {
  Song
    .findById(req.params.id)
    .then(function (song) {return song.updateAttributes(req.body)})
    .then(function (song) {
      res.status(201).json(song)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('update song failed')
    })
})

// delete song
router.delete('/:id', function (req, res) {
  Song
    .findById(req.params.id)
    .then(function (song) {return song.destroy()})
    .then(function () {
      res.sendStatus(204)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('delete song failed')
    })
})

module.exports = router
