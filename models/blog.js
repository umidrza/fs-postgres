const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Blog extends Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1991],
                msg: 'Year must be at least 1991'
            },
            max: {
                args: [new Date().getFullYear()],
                msg: 'Year cannot be in the future'
            }
        }
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
})

module.exports = Blog