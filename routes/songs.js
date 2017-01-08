const router = require('express').Router()
const {Song, Album, Artist} = require('../models')

// list all songs
router.get('/', (req, res) => {
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
    .then((songs) => {
      res.json(songs)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('list all songs failed')
    })
})

// show song
router.get('/:id', (req, res) => {
  Song
    .findById(req.params.id, {attributes: ['id', 'title', 'duration', 'albumId']})
    .then((song) => {
      res.json(song)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('show song failed')
    })
})

// create song
router.post('/', (req, res) => {
  Song
    .create(req.body)
    .then((song) => {
      res.location(req.baseUrl + '/' + song.get('id'))
      res.status(201).json(song)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('create song failed')
    })
})

// update song
router.put('/:id', (req, res) => {
  Song
    .findById(req.params.id)
    .then((song) => song.updateAttributes(req.body))
    .then((song) => {
      res.status(201).json(song)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('update song failed')
    })
})

// delete song
router.delete('/:id', (req, res) => {
  Song
    .findById(req.params.id)
    .then((song) => song.destroy())
    .then(() => {
      res.sendStatus(204)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('delete song failed')
    })
})

module.exports = router
