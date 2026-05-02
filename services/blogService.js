const { Blog, User } = require('../models')
const { Op } = require('sequelize')

const getAll = async ({ search }) => {
  const where = {}

  if (search) {
    where[Op.or] = [
      {
        title: {
          [Op.substring]: search
        }
      },
      {
        author: {
          [Op.substring]: search
        }
      }
    ]
  }

  return await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
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