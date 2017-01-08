const router = require('express').Router()
const {Artist, Album} = require('../models')

// list all artists
router.get('/', (req, res) => {
  Artist
    .findAll({attributes: ['id', 'name', 'genre']})
    .then((artists) => {
      res.json(artists)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('list all artists failed')
    })
})

// show artist
router.get('/:id', (req, res) => {
  Artist
    .findById(req.params.id, {
      attributes: ['id', 'name', 'genre'],
      include: [{
        model: Album,
        attributes: ['id', 'title', 'year']
      }]
    })
    .then((artist) => {
      res.json(artist)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('show artist failed')
    })
})

// create artist
router.post('/', (req, res) => {
  Artist
    .create(req.body)
    .then((artist) => {
      res.location(req.baseUrl + '/' + artist.get('id'))
      res.status(201).json(artist)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('create artist failed')
    })
})

// update artist
router.put('/:id', (req, res) => {
  Artist
    .findById(req.params.id)
    .then((artist) => artist.updateAttributes(req.body))
    .then((artist) => {
      res.status(201).json(artist)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('update artist failed')
    })
})

// delete artist
router.delete('/:id', (req, res) => {
  Artist
    .findById(req.params.id)
    .then((artist) => artist.destroy())
    .then(() => {
      res.sendStatus(204)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('delete artist failed')
    })
})

module.exports = router
