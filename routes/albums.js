const router = require('express').Router()
const {Album, Artist} = require('../models')

// list all albums
router.get('/', (req, res) => {
  Album
    .findAll({
      attributes: ['id', 'title', 'year'],
      include: [{
        model: Artist,
        attributes: ['id', 'name']
      }]
    })
    .then((albums) => {
      res.json(albums)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('list all albums failed')
    })
})

// show album
router.get('/:id', (req, res) => {
  Album
    .findById(req.params.id, {
      attributes: ['id', 'title', 'year', 'artistId']
    })
    .then((album) => {
      res.json(album)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('show album failed')
    })
})

// create album
router.post('/', (req, res) => {
  Album
    .create(req.body)
    .then((album) => {
      res.location(req.baseUrl + '/' + album.get('id'))
      res.status(201).json(album)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('create album failed')
    })
})

// update album
router.put('/:id', (req, res) => {
  Album
    .findById(req.params.id)
    .then((album) => album.updateAttributes(req.body))
    .then((album) => {
      res.status(201).json(album)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('update album failed')
    })
})

// delete album
router.delete('/:id', (req, res) => {
  Album
    .findById(req.params.id)
    .then((album) => album.destroy())
    .then(() => {
      res.sendStatus(204)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('delete album failed')
    })
})

module.exports = router

// Artist
//   .create({
//     name: 'Enya',
//     genre: 'Celtic music'
//   })
//   .then((artist) => {
//     return artist.createAlbum({
//       title: 'A Day Without Rain',
//       year: 2000
//     })
//   })
//   .then((album) => {
//     res.json(album)
//   })
