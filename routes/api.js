const models  = require('../models')
const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/albums', (req, res, next) => {
  const Album = models.Album

  Album
    .sync({force: true})
    .then(() => {
      return Album.create({
        title: 'John',
        date: new Date()
      })
    })
    .then(() => {
      Album.findAll().then((albums) => {
        res.json(albums)
      })
    })
})

module.exports = router
