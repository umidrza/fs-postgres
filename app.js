const express = require('express')
const notesRouter = require('./controllers/notes')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

const app = express()
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)

module.exports = app