//controllers of rooms

//models
const Caracs = require('../models/Caracs.js');
const Category = require('../models/Category.js');


//database (for raw queries)
const sequelize = require('../db/dbconfig.js');
//sequelize module
const Sequelize = require('sequelize');

//filesystem module to delete img from /imgs' directory
const fs = require('fs');

//caracs page (admin side)
const displayCaracs = async(req, res) => {
    try {
        const caracs = await Caracs.findAll();
        //convert to json format
        const json_caracs = await JSON.parse(JSON.stringify(caracs));
        const messageCarac = req.flash('messageCarac');
        //render 'rooms' page
        res.render('caracs', {
            title: 'Admin - Caracteristics',
            caracsData: json_caracs,
            messageCarac
        });
    } catch (error) {
        res.end(error);
    }
}

//delete carac
const deleteCarac = async(req, res) => {
    try {
        const id = req.params.idCrc;
        //delete 'room' record frm database
        await Caracs.destroy({
            where: {
                id_crc: id
            }
        });
        //message
        req.flash('messageCarac', 'Caracteristic deleted');
        res.redirect('/admin/caracs');
    } catch (error) {
        res.end(error);
    }
}

//add carac page
const carac_displayAdd = async (req, res) => {
    try {
        res.render('carac-add', {
            title: 'Add Caracteristic',
        });
    } catch (error) {
        console.log(error);
        res.end(error);
    }
}

//add carac
const addCarac = async(req, res) => {
    try {
        let { carac } = req.body;
        
        await Caracs.create({
            crc: carac.trim()
        }, {
            fields: ['crc']
        });
        //message
        req.flash('messageCarac', 'Caracteristic added');
        //redirect 'caracs' page
        res.redirect('/admin/caracs');
    } catch (error) {
        res.end(error);
    }
}

//edit carac page
const carac_displayEdit = async(req, res) => {
    try {
        const { idCrc } = req.params;
        //find room by id
        const crcs = await Caracs.findAll({
            where: {
                id_crc: idCrc
            }
        });
        //convert to json format
        const json_crcs = await JSON.parse(JSON.stringify(crcs));
        //render edit page
        res.render('carac-edit', {
            title: 'Edit Caracteristic',
            caracsData: json_crcs
        });
    } catch (error) {
        res.end(error);
    }
}

//edit carac
const editCarac = async(req, res) => {
    try {
        const { idCrc, carac } = req.body;

        //update record
        await Caracs.update({
            crc: carac
        },{ 
            where: {
                id_crc: idCrc
            }
        }, {
            fields: ['crc']
        });
        //message
        req.flash('messageCarac', 'Caracteristic edited');
        //redirect
        res.redirect('/admin/caracs');
    } catch (error) {
        res.end(error);
    }
}

module.exports = {
    displayCaracs,
    deleteCarac,
    carac_displayAdd,
    addCarac,
    carac_displayEdit,
    editCarac
}

