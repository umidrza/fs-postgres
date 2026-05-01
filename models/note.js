const { Sequelize, Model, DataTypes } = require('sequelize')
const config = require('../utils/config')

const sequelize = new Sequelize(config.DATABASE_URL, {
    dialectOptions: {
        ssl: false
    },
});

class Note extends Model { }
Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    important: {
        type: DataTypes.BOOLEAN
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
})

module.exports = Note