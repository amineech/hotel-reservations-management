const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

const Image = database.define('categorycaracs', {
    category: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    carac: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }}, {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });

module.exports = Image;