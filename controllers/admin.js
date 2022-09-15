//admin page controller

const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

//models
const Reservation = require('../models/Reservation.js');
const JSONTransport = require('nodemailer/lib/json-transport');

const displayAdmin = async(req, res) => {
    try {
        const rsvs_nonconfirmed = await Reservation.findAll({
            where: {
                room: null
            }
        });
        const units = await database.query(
            `select id_category, label_category, count(category) as numberOfUnits from categories join rooms on categories.id_category = rooms.category
             group by id_category, label_category`, 
             {
                 type: Sequelize.QueryTypes.SELECT
             });
        //json
        const json_rsvs = await JSON.parse(JSON.stringify(rsvs_nonconfirmed));
        const json_units = await JSON.parse(JSON.stringify(units));
        res.render('admin', {
            title: 'Felicity - Admin Panel',
            stat: 'Unconfirmed Reservations',
            dataRsvs: json_rsvs,
            unitsData: json_units
        });
    } catch (error) {
        res.end(error);
    }
}

module.exports = {
    displayAdmin
}