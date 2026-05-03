const router = require('express').Router()
const { ReadingList, User, Blog } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')
const asyncHandler = require('../middleware/asyncHandler')
const finder = require('../utils/finder')
const authorizeBlogOwner = require('../middleware/authorizeBlogOwner')

const userFinder = finder(User, 'user', 'body', 'userId')
const blogFinder = finder(Blog, 'blog', 'body', 'blogId')
const readingListFinder = finder(ReadingList, 'readingList', 'params', 'id')

router.post('/', tokenExtractor, userFinder, blogFinder, authorizeBlogOwner, asyncHandler(async (req, res, next) => {
    const existingEntry = await ReadingList.findOne({ where: { userId: req.user.id, blogId: req.blog.id } })

    if (existingEntry) {
        return res.status(400).json({ error: 'Blog already in reading list' })
    }

    const entry = await ReadingList.create({ blogId: req.blog.id, userId: req.user.id, isRead: false })

    res.status(201).json(entry)
}))

router.put('/:id', tokenExtractor, readingListFinder, authorizeBlogOwner, asyncHandler(async (req, res, next) => {
    const entry = req.readingList

    entry.isRead = req.body.isRead
    await entry.save()

    res.json(entry)
}))

module.exports = router