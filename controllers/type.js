//types controller(client side)

//model
const Category = require('../models/Category.js');

//database
const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

const displayTypes = async (req, res) => {
    try {
        const categories = await database.query(
            `SELECT id_category, label_category, image FROM categories join images on categories.id_category = images.category`,
        {
            type: Sequelize.QueryTypes.SELECT
        });
        //json
        const json_ctgs = await JSON.parse(JSON.stringify(categories));
        for(let i = 0; i < json_ctgs.length-1; i++){
            for(let j = i+1; j < json_ctgs.length; j++){
                if(json_ctgs[i].id_category === json_ctgs[j].id_category){
                    json_ctgs.splice(j, 1);
                    j--;
                }
            }
        }
        //render 'types' page
        res.render('types', {
            title: 'Felicity - Accomodations',
            categoriesData: json_ctgs,
        });
    } catch (error) {
        res.end(error);
    }
}

module.exports = {
    displayTypes
}