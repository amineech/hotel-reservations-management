const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

const Reservation = database.define('reservations', {
    id_reservation: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    telephone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.INTEGER
    },
    date_checkin: {
        type: Sequelize.DATE
    },
    date_checkout: {
        type: Sequelize.DATE
    },
    room: {
        type: Sequelize.INTEGER
    }}, {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });

    module.exports = Reservation;