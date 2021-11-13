const express = require('express')
const app = express()
const cors = require('cors')

const contractRouter = require('./controllers/contract')
//const contractRouter_cb = require('./controllers/contract_cb')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/contract', contractRouter)
//app.use('/api/contract_cb', contractRouter_cb)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app