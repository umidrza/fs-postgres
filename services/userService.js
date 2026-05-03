const { User, Blog, Team } = require('../models')
const bcrypt = require('bcrypt')

const getAll = async () => {
    return await User.findAll({
        attributes: { exclude: ['passwordHash'] },
        include: [
            {
                model: Blog,
                attributes: { exclude: ['userId'] }
            },
            {
                model: Team,
                attributes: ['name', 'id'],
                through: {
                    attributes: []
                }
            }
        ]
    })
}

const getByUsername = async (username, { read }) => {
    const includeMarkedBlogs = {
        model: Blog,
        as: 'marked_blogs',
        attributes: { exclude: ['userId'] },
        through: {
            attributes: ['isRead', 'id']
        },
        include: {
            model: User,
            attributes: ['name']
        }
    }

    if (read === 'true') {
        includeMarkedBlogs.through.where = { isRead: true }
        includeMarkedBlogs.required = true
    }

    if (read === 'false') {
        includeMarkedBlogs.through.where = { isRead: false }
        includeMarkedBlogs.required = true
    }

    return await User.findOne({
        where: { username },
        attributes: { exclude: ['passwordHash'] },
        include: [
            {
                model: Blog,
                attributes: { exclude: ['userId'] }
            },
            includeMarkedBlogs,
            {
                model: Team,
                attributes: ['name', 'id'],
                through: {
                    attributes: []
                }
            }
        ]
    })
}

const create = async (data) => {
    const { username, name, password } = data

    const passwordHash = await bcrypt.hash(password, 10)

    await User.create({
        username,
        name,
        passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

const update = async (user, data) => {
    return await user.update({ ...data, updatedAt: new Date() })
}

module.exports = {
    getAll,
    create,
    getByUsername,
    update
}