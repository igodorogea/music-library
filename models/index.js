const path = require('path')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('music-library', null, null, {
  dialect: 'sqlite',
  storage: 'data/db.sqlite'
})

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  Album: sequelize.import(path.join(__dirname, 'album'))
}
