const express = require('express')
const blogsRouter = require('./controllers/blogs')
const authorsRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readingLists')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('ok');
});

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/reading-lists', readingListsRouter)
app.use('/api/testing', testingRouter)

app.use(errorHandler)

module.exports = app