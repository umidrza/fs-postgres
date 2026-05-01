const notesRouter = require("express").Router();
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

notesRouter.post('/', async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, date: new Date() })
    return res.json(note)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id)

    if (!note) {
      return res.status(404).end()
    }

    await note.update(req.body)

    res.json(note)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter