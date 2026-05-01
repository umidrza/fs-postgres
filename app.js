const express = require('express')
const notesRouter = require('./controllers/notes')
const config = require('./utils/config')

const app = express()
app.use(express.json())

app.use('/api/notes', notesRouter)

module.exports = app