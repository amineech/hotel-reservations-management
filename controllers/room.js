//rooms controller

//database
const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

//models
const Category = require('../models/Category.js');
const Room = require('../models/Room.js');

//get rooms page
const displayRooms = async(req, res) => {
    try {
        const rooms = await database.query('select * from rooms join categories on rooms.category = categories.id_category',
        {
            type: Sequelize.QueryTypes.SELECT
        });
        //json
        const json_rooms = await JSON.parse(JSON.stringify(rooms));
        // set msg
        const msgRoom = req.flash('msgRoom');
        //render rooms page
        res.render('rooms', {
            title: 'Admin - Rooms',
            roomsData: json_rooms ,
            msgRoom
        });
    } catch (error) {
        res.end(error);
    }
};

//add room page
const display_addRoom = async(req, res) => {
    try {
        const categories = await Category.findAll();
        //JSON
        const json_ctgs = await JSON.parse(JSON.stringify(categories));
        //
        res.render('room-add', {
            title: 'Add Room',
            categoriesData: json_ctgs
        });
    } catch (error) {
        res.end(error);
    }
};  

//add room
const addRoom = async(req, res) => {
    try {
        const { room_number, category } = req.body;

        await Room.create({
            number_room: room_number,
            category: category
        });
        req.flash('msgRoom', 'Room added');
        res.redirect('/admin/rooms');
    } catch (error) {
        res.end(error);
    }
};

//edit room page
const display_editRoom = async(req, res) => {
    try {
        const { idRoom } = req.params; 

        const categories = await Category.findAll();
        const room = await Room.findAll({
            where: { id_room: idRoom }
        });
        //JSON
        const json_ctgs = await JSON.parse(JSON.stringify(categories));
        const json_room = await JSON.parse(JSON.stringify(room));

        res.render('room-edit', {
            title: 'Edit Room',
            categoriesData: json_ctgs,
            roomData: json_room
        });
    } catch (error) {
        res.end(error);
    }
};

//edit room
const editRoom = async(req, res) => {
    try {
        const { idRoom, numberRoom, category } = req.body;
        //update record
        await Room.update({
            number_room: numberRoom,
            category: category
        },{
            where: { id_room: idRoom }
        },{
            fields: ['number_room', 'category']
        });
        //msg
        req.flash('msgRoom', 'Room edited');
        res.redirect('/admin/rooms');
    } catch (error) {
        res.end(error);
    }
};

//delete room
const deleteRoom = async(req, res) => {
    try {
        const { idRoom } = req.params;
        await Room.destroy({
            where: {
                 id_room: idRoom
            }
        });
        req.flash('msgRoom', 'Room deleted');    
        res.redirect('/admin/rooms');
    } catch (error) {
        res.end(error);
    }
};

module.exports = {
    displayRooms,
    display_addRoom,
    addRoom,
    display_editRoom,
    editRoom,
    deleteRoom
};