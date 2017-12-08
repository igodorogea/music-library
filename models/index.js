const path = require('path')
const Sequelize = require('sequelize')

/**
 * https://github.com/sequelize/express-example
 */

const models = {}

const sequelize = new Sequelize('music-library', null, null, {
  dialect: 'sqlite',
  storage: 'data/db.sqlite'
})

models.Song = sequelize.import(path.join(__dirname, 'song'))
models.Album = sequelize.import(path.join(__dirname, 'album'))
models.Artist = sequelize.import(path.join(__dirname, 'artist'))

Object.keys(models).forEach(function (modelName) {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
