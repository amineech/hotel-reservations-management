const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

const Image = database.define('caracs', {
    id_crc: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    crc: {
        type: Sequelize.STRING
    }}, {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });

module.exports = Image;