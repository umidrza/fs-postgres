const router = require('express').Router()
const { ReadingList, User, Blog } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')
const asyncHandler = require('../middleware/asyncHandler')
const finder = require('../utils/finder')

const blogFinder = finder(Blog, 'blog', 'body', 'blogId')
const readingListFinder = finder(ReadingList, 'readingList', 'params', 'id')

router.post('/', tokenExtractor, blogFinder, asyncHandler(async (req, res, next) => {
    const userId = req.user.id
    const blogId = req.blog.id

    const existingEntry = await ReadingList.findOne({ where: { userId, blogId } })

    if (existingEntry) {
        return res.status(400).json({ error: 'Blog already in reading list' })
    }

    const entry = await ReadingList.create({ blogId, userId, isRead: false })
    console.log('Created reading list entry:', entry.toJSON())

    res.status(201).json(entry)
}))

router.put('/:id', tokenExtractor, readingListFinder, asyncHandler(async (req, res, next) => {
    const entry = req.readingList

    if (entry.userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: not the owner' })
    }

    entry.isRead = req.body.isRead
    await entry.save()

    res.json(entry)
}))

module.exports = router