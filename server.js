const app = require('./app')
const http = require('http')
const {sequelize, Artist, Album, Song} = require('./models')

const port = '3000'
app.set('port', port)

const server = http.createServer(app)

sequelize
  .sync(/*{force: true}*/)
  // .then(() => createDummyData())
  .then(function () {
    server.listen(port)
    console.log('Listening on 3000...')
  })
  .catch((error) => {
    console.warn(error)
  })

function createDummyData () {
  const promises = [];
  const multiplier = 5;

  for (let i = 1, p = 0; i <= multiplier; i++) {
    promises[p++] = Artist.create({name: `Artist ${i}`, genre: `Genre ${i}`})

    for (let j = 1; j <= multiplier; j++) {
      promises[p++] = Album.create({
        title: `Album ${(i - 1) * multiplier + j}`,
        year: Math.floor(Math.random() * (2016 - 1970)) + 1970,
        artistId: i
      })

      for (let k = 1; k <= multiplier; k++) {
        promises[p++] = Song.create({
          title: `Song ${(i - 1) * multiplier * multiplier + (j - 1) * multiplier + k}`,
          duration: Math.floor(Math.random() * (600 - 10)) + 10,
          albumId: (i - 1) * multiplier + j
        })
      }
    }
  }

  return Promise.all(promises);
}