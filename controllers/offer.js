// offer controller(client side)

//models
const Image = require('../models/Image.js');

//database
const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

const category_details = async(req, res) => {
    try {
        const { idCategory } = req.params;
        //get category data
        const details = await database.query(
            `select * from categories join categorycaracs on categories.id_category = categorycaracs.category join caracs
             on categorycaracs.carac = caracs.id_crc where categories.id_category = ?`,
            {
                replacements: [idCategory],
                type: Sequelize.QueryTypes.SELECT
            });
        //get category images
        const images = await Image.findAll({
            where: { category: idCategory }
        });
        //json format
        const json_details = await JSON.parse(JSON.stringify(details));
        const json_images = await JSON.parse(JSON.stringify(images));
        //check if image length odd or even
        if(json_images.length % 2 !== 0){
            for(let image of json_images){
                image.odd = true;
            }
        }
        //set up messages
        const messageOffer = req.flash('messageOffer');
        const messageBooked = req.flash('messageBooked');
        res.render('offer-details', {
            title: 'Felicity - Offer - Details',
            detailsData: json_details,
            imagesData: json_images,
            messageOffer,
            messageBooked
        });
    } catch (error) {
        res.end(error);
    }
}

module.exports = {
    category_details
}