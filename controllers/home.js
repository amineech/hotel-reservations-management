//database
const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

const Category = require('../models/Category.js');


//get home page
const home = async(req, res) => {
    try {
        const ctgs = await Category.findAll();
        //json
        const json_ctgs = await JSON.parse(JSON.stringify(ctgs));
        const imgs = await database.query(
            `select * from categories join images on categories.id_category = images.category
            where label_category = ?`,
        {
            replacements: [json_ctgs[3].label_category], //random category selection
            type: Sequelize.QueryTypes.SELECT
        });
        // json
        const json_imgs = await JSON.parse(JSON.stringify(imgs));
        //set msg
        const msgContact = req.flash('msgContact');
        res.render('index', {
            title: 'Felicity - Home',
            images: json_imgs,
            msgContact
        });
    } catch (error) {
        res.end(error);
    }
};



module.exports = {
    home
};