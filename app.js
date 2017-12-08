const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const api = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', api)

module.exports = app
