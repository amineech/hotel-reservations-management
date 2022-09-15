//reservations controller (admin side)

//database
const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

//model
const Reservation = require('../models/Reservation.js');
const Room = require('../models/Room.js');


//reservations page
const displayReservations = async(req, res) => {
    try {
        const reservations = await database.query(`select * from reservations join categories on reservations.category = categories.id_category`,
        {
            type: Sequelize.QueryTypes.SELECT
        });

        //convert to json format
        let json_rsvs = await JSON.parse(JSON.stringify(reservations));

        //reverse date format(from yyyy-mm-dd t dd-mm-yyyy)
        for(let rsv of json_rsvs){
            for(let key in rsv){
                if(key === 'date_checkin' || key === 'date_checkout' || key === 'created_at'){
                    if(rsv[key] !== null){
                        rsv[key] = rsv[key].split('-').reverse().join('-');
                    }
                }
            }
        }

        // console.log(json_rsvs);
        const rooms = await Room.findAll(); 
        json_rooms = await JSON.parse(JSON.stringify(rooms));

        //set up message
        const messageRsv = req.flash('messageRsv');
        res.render('reservations', {
            title: 'Admin - Reservations',
            data: json_rsvs,
            roomsData: json_rooms,
            messageRsv
        });
    } catch (error) {
        res.end(error);
    }
}

//delete reservation
const deleteReservation = async(req, res) => {
    try {
        const { idReservation } = req.params;
        //delete frm database
        await Reservation.destroy({
            where: {
                id_reservation: idReservation
            }
        });
        //message
        req.flash('messageRsv', 'Reservation deleted');
        res.redirect('/admin/reservations');
    } catch (error) {
        res.end(error);
    }
};

//show more infos reservation
const reservation_showMore = async(req, res) => {
    try {
        const idRsv = req.params.idReservation;
        const reservation = await database.query(`
            select * from reservations join categories on reservations.category = categories.id_category 
            where id_reservation = ?`,
        {
            replacements: [idRsv],
            type: Sequelize.QueryTypes.SELECT
        });
        //json
        const json_rsv = await JSON.parse(JSON.stringify(reservation));

        //get room number
        const room = await Room.findAll({
            where: { id_room: json_rsv[0].room }
        });
        //json
        const json_room = await JSON.parse(JSON.stringify(room));
        //reverse date format(from yyyy-mm-dd t dd-mm-yyyy)
        for(let rsv of json_rsv){
            for(let key in rsv){
                if(key === 'date_checkin' || key === 'date_checkout' || key === 'created_at'){
                    rsv[key] = rsv[key].split('-').reverse().join('-');
                }
            }
        }
        res.render('reservation-show', {
            title: 'Reservation - More',
            reservation: json_rsv,
            room: json_room
        });
    } catch (error) {
        res.end(error);
    }
};

//confirm reservation
const confirmReservation = async(req, res) => {
    try {
        //get values from the form
        const idR = req.params.idReservation;
        let { room , category, checkin, checkout } = req.body;

        //check if entered room option is not empty
        if(room === null ||room === undefined){
            req.flash('messageRsv', 'Fill the room before confirmation please !');
            return res.redirect('/admin/reservations');
        }

        //check if chosen room is identical with the category f reservation
        const theroom = await Room.findAll({
            where: {
                id_room: room,
                category: category
            }
        });
        const json_rms = await JSON.parse(JSON.stringify(theroom));

        if(theroom === null || Object.keys(json_rms).length === 0){
            req.flash('messageRsv', 'Option should be identical with chosen category');
            return res.redirect('/admin/reservations');
        }

        //reverse dates
        checkin = checkin.split('-').reverse().join('-');
        checkout = checkout.split('-').reverse().join('-');

        //convert checkin and checkout dates t milliseconds
        let d_in = new Date(checkin);
        let d_out = new Date(checkout);
        //convert to milliseconds
        d_in_mill = d_in.getTime();
        d_out_mill = d_out.getTime();

        //all reservatipn with same room choice
        const reservations = await Reservation.findAll({
            where: {room: room }
        });
        //json
        const rsvs = await JSON.parse(JSON.stringify(reservations));

        //reserved variable (check if option is booked or not)
        let reserved = false;
        //tests
        for(let rsv of rsvs){
            //date of checkin  (in reservations table)
            let dr_in = new Date(rsv.date_checkin);
            //date of checkout (in reservations table)
            let dr_out = new Date(rsv.date_checkout);
            if(d_in_mill > dr_in.getTime() && d_in_mill < dr_out.getTime()) {
                reserved = true;
            } else if (d_out_mill > dr_in.getTime() && d_out_mill < dr_out.getTime()) {
                reserved = true;
            } else if(d_in_mill > dr_in.getTime() && d_out_mill < dr_out.getTime()) {
                reserved = true;
            } else if( d_in_mill < dr_in.getTime() && d_out_mill > dr_out.getTime()) {
                reserved = true;
            } 
        }
        //check if reserved or not
        if(!reserved){
            //change room value
            await Reservation.update({
                room: room
            },{
                where: { id_reservation: idR }
            }, {
                fields: ['room']
            });
            //set msg
            req.flash('messageRsv', 'Reservation confirmed');
            //redirect to the same page 
            res.redirect('/admin/reservations');
        } else{
            req.flash('messageRsv', 'Option already booked in this period');
            res.redirect(`/admin/reservations`);
        }
    } catch (error) {
        res.end(error);
    }
};


module.exports = {
    displayReservations,
    deleteReservation,
    confirmReservation,
    reservation_showMore
};