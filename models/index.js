const Blog = require('./blog')
const User = require('./user')
const Team = require('./team')
const Membership = require('./membership')
const ReadingList = require('./readingList')
const Session = require('./session')

Session.belongsTo(User)
User.hasMany(Session)

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readers' })

module.exports = {
    Blog, User, Team, Membership, ReadingList, Session
}