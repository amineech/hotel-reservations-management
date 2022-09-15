const Sequelize = require('sequelize');
const database = require('../db/dbconfig.js');

const Category = database.define('categories', {
    id_category: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    label_category: {
        type: Sequelize.STRING,
    },
    price_category: {
        type: Sequelize.FLOAT
    },
    nb_max_persons: {
        type: Sequelize.INTEGER
    }},{
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });

module.exports = Category;