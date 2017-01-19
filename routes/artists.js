const router = require('express').Router()
const Artist = require('../models').Artist
const Album = require('../models').Album

// list all artists
router.get('/', function (req, res) {
  Artist
    .findAll({attributes: ['id', 'name', 'genre']})
    .then(function (artists) {
      res.json(artists)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('list all artists failed')
    })
})

// show artist
router.get('/:id', function (req, res) {
  Artist
    .findById(req.params.id, {
      attributes: ['id', 'name', 'genre'],
      include: [{
        model: Album,
        attributes: ['id', 'title', 'year']
      }]
    })
    .then(function (artist) {
      res.json(artist)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('show artist failed')
    })
})

// create artist
router.post('/', function (req, res) {
  Artist
    .create(req.body)
    .then(function (artist) {
      res.location(req.baseUrl + '/' + artist.get('id'))
      res.status(201).json(artist)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('create artist failed')
    })
})

// update artist
router.put('/:id', function (req, res) {
  Artist
    .findById(req.params.id)
    .then(function (artist) {return artist.updateAttributes(req.body)})
    .then(function (artist) {
      res.status(201).json(artist)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('update artist failed')
    })
})

// delete artist
router.delete('/:id', function (req, res) {
  Artist
    .findById(req.params.id)
    .then(function (artist) {return artist.destroy()})
    .then(function () {
      res.sendStatus(204)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('delete artist failed')
    })
})

module.exports = router
