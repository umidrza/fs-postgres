const User = require('../models')
const bcrypt = require('bcrypt')

const getAll = async () => {
    return await User.findAll({
        attributes: { exclude: ['passwordHash'] },
        include: {
            model: Blog,
        }
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

const getByUsername = async (username) => {
    return await User.findOne({ where: { username } })
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