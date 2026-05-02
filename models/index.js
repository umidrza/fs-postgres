const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog, { foreignKey: 'userId' })
Blog.belongsTo(User, { foreignKey: 'userId' })

User.sync({ alter: true })
Blog.sync({ alter: true })

module.exports = {
    Blog, User
}