const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

const Image = database.define('images', {
    id_img: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.INTEGER,
    }}, {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });

module.exports = Image;