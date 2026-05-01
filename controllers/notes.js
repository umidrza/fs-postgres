const notesRouter = require("express").Router();
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.findAll()  
  res.json(notes)
})

notesRouter.post('/', async (req, res) => {
  try {
    const note = await Note.create({...req.body, date: new Date()})
    return res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

module.exports = notesRouter