// controllers of categories

const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

//models
const Category = require('../models/Category.js');
const Caracs = require('../models/Caracs.js');
const CategoryCaracs = require('../models/CategoryCaracs.js');

//categories page (admin side)
const displayCategories = async(req, res) => {
    try {
        const ctgs = await Category.findAll({attributes: [
            'id_category',
            'label_category',
            'price_category',
            'nb_max_persons'
        ]});
        //convert result to json format
        const json_ctgs = await JSON.parse(JSON.stringify(ctgs));
        //message set up
        const messageCategory = req.flash('messageCategory');
        //render 'categories' page
        res.render('categories', {
            title: 'Admin - Categories',
            categories: json_ctgs,
            messageCategory
        });
    } catch (error) {
        console.log(error);
        res.end(error);
    }
}

//delete category
const deleteCategory = async(req, res) => {
    try {
        const id = req.params.idCategory;
        await Category.destroy({
            where: {
                id_category: id
            }
        });
        req.flash('messageCategory', 'Category deleted');
        res.redirect('/admin/categories');
    } catch (error) {
        console.log(error);
        res.end(error);
    }
}

//edit category page
const category_displayEdit = async (req, res) => {
    try {
        const id = req.params.idCategory;
        //find category by id
        const category = await Category.findAll({
            where: {
                id_category: id
            }
        });
        const ctgsCrcs = await database.query(
        'select * from caracs join categorycaracs on caracs.id_crc = categorycaracs.carac where category = ?',
        {
            replacements: [id],
            type: Sequelize.QueryTypes.SELECT
        });
        const caracs = await Caracs.findAll();
        //convert to json format
        let json_ctgs = await JSON.parse(JSON.stringify(category));
        let json_ctgCrcs = await JSON.parse(JSON.stringify(ctgsCrcs)); 
        let json_caracs = await JSON.parse(JSON.stringify(caracs)); 
        //check for matches 
        for(let cc1 of json_caracs){
            for(let cc2 of json_ctgCrcs){
                if(cc2.carac === cc1.id_crc){
                    cc1.exist = true
                    break;
                }
                else{
                    cc1.exist = false
                }
            }
        }
        //render page
        res.render('category-edit', {
            title: 'Edit Category',
            categoryData: json_ctgs,
            caracsData: json_caracs
        });
    } catch (error) {
        console.log(error);
        res.end(error);
    }
}

//edit category
const editCategory = async (req, res) => {
    try {
        let { idctg, labelC, priceC, nbmax } = req.body;
        let caracs = req.body.carac;
        caracs = [caracs].flat(); //to make an array of one element out of a string 
        await Category.update({
            label_category: labelC.trim(),
            price_category: priceC.trim(),
            nb_max_persons: nbmax.trim(),
        }, {
            where: { id_category: idctg }
        },{
            fields: ['label_category', 'price_category', 'nb_max_persons']
        });
        const ctgsCrcs = await CategoryCaracs.findAll({
            where: { category: idctg }
        });
        //convert to json
        const json_ctgCrcs = await JSON.parse(JSON.stringify(ctgsCrcs));
        //vars to put new value in
        let arrAdded = [];//new array with new caracs values
        let arrDeleted = [];//new array with deleted caracs values
        let exist = false;//see if caracteristic exists already or new
        //find deleted caracsteristics 
        for(let i = 0; i < json_ctgCrcs.length; i++){
                if(caracs.includes(json_ctgCrcs[i].carac.toString())){
                    continue;
                } else{
                    arrDeleted.push(json_ctgCrcs[i].carac);
                }
        }
        //find new added caracteristics
        for(let i = 0; i < caracs.length; i++){
            for(let j = 0; j < json_ctgCrcs.length; j++){
                if(parseInt(caracs[i]) === json_ctgCrcs[j].carac){
                    exist = true;
                    break;
                }
            }
            if(!exist){
                //for bulk create
                arrAdded.push({
                    category: idctg,
                    carac: caracs[i]
                });
            }
            exist = false;
        }
        //delete deleted ones
        await CategoryCaracs.destroy({
            where: {
                category: idctg,
                carac: arrDeleted //array of caracteristics's ids
            }
        });
        //add new ones
        await CategoryCaracs.bulkCreate(arrAdded);
        //set msg and render page 'categories'
        req.flash('messageCategory', 'Categorie edited');
        res.redirect('/admin/categories');
    } catch (error) {
        res.end(error);
    }
}

//add category page
const category_displayAdd = async(req, res) => {
    try {
        const crcs = await Caracs.findAll();
        //convert to json
        const json_crcs = await JSON.parse(JSON.stringify(crcs));
        res.render('category-add', {
            title: 'Add Category',
            caracsData: json_crcs
        });
    } catch (error) {
        console.log(error);
        res.end(error);
    }
}

//add category
const addCategory = async(req, res) => {
    try {
        const { labelC, priceC, nbmax } = req.body;
        //array of all checked caracteristic
        let caracs = req.body.carac;
        console.log(caracs);
        //create category
        const ctg = await Category.create({
            label_category: labelC.trim(),
            price_category: priceC.trim(),
            nb_max_persons: nbmax.trim(),
        }, {
            fields: ['label_category', 'price_category', 'nb_max_persons']
        });
        //create array of object to put in bulkCreate
        let ctgsCaracs = [];
        for(let c of caracs){
            ctgsCaracs.push({
                category: ctg.id_category,
                carac: c
            });
        }
        console.log(ctgsCaracs);
        //create association between caracteristics and category
        await CategoryCaracs.bulkCreate(ctgsCaracs);
        //message
        req.flash('messageCategory', 'Categorie added');
        res.redirect('/admin/categories');
    } catch (error) {
        console.log(error);
        res.end(error);
    }
}

module.exports = { 
    displayCategories, 
    deleteCategory,
    category_displayEdit,
    editCategory,
    category_displayAdd,
    addCategory
};