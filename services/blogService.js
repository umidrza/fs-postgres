const { Blog, User } = require('../models')

const getAll = async () => {
  return await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
}

const create = (data) => Blog.create(data)
const update = (blog, data) => blog.update(data)
const remove = (blog) => blog.destroy()

module.exports = {
  getAll,
  create,
  update,
  remove
}