const router = require('express').Router()
const Artist = require('../models').Artist
const Album = require('../models').Album

// list all albums
router.get('/', function (req, res) {
  Album
    .findAll({
      attributes: ['id', 'title', 'year'],
      include: [{
        model: Artist,
        attributes: ['id', 'name']
      }]
    })
    .then(function (albums) {
      res.json(albums)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('list all albums failed')
    })
})

// show album
router.get('/:id', function (req, res) {
  Album
    .findById(req.params.id, {
      attributes: ['id', 'title', 'year', 'artistId']
    })
    .then(function (album) {
      res.json(album)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('show album failed')
    })
})

// create album
router.post('/', function (req, res) {
  Album
    .create(req.body)
    .then(function (album) {
      res.location(req.baseUrl + '/' + album.get('id'))
      res.status(201).json(album)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('create album failed')
    })
})

// update album
router.put('/:id', function (req, res) {
  Album
    .findById(req.params.id)
    .then(function (album) {return album.updateAttributes(req.body)})
    .then(function (album) {
      res.status(201).json(album)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('update album failed')
    })
})

// delete album
router.delete('/:id', function (req, res) {
  Album
    .findById(req.params.id)
    .then(function (album) {return album.destroy()})
    .then(function () {
      res.sendStatus(204)
    })
    .catch(function (error) {
      console.warn(error)
      res.status(500).send('delete album failed')
    })
})

module.exports = router
