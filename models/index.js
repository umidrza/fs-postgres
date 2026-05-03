const Blog = require('./blog')
const User = require('./user')
const Team = require('./team')
const Membership = require('./membership')
const ReadingList = require('./readingList')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.belongsToMany(Blog, { through: ReadingList, as: 'marked_blogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_marked' })

module.exports = {
    Blog, User, Team, Membership, ReadingList
}