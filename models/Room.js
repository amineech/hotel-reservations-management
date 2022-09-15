const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

const Room = database.define('rooms', {
    id_room: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number_room: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.INTEGER
    }}, {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });

module.exports = Room;