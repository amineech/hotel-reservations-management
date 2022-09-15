//controller

//database
const database = require('../db/dbconfig.js');
const Sequelize = require('sequelize');

//models
const Category = require('../models/Category.js');
const Image = require('../models/Image.js');

//modules to delete image from server
const fs = require('fs');

//display images along with their categories
const displayImages = async(req, res) => {
    try {
        const images = await database.query('select * from images join categories on images.category = categories.id_category', {
            type: Sequelize.QueryTypes.SELECT
        });
        //json format
        const json_data = await JSON.parse(JSON.stringify(images)); 
        //set message
        const msgImage = req.flash('msgImage');
        res.render('images', {
            title: 'Images',
            imagesData: json_data,
            msgImage
        });
    } catch (error) {
        res.end(error);
    }
};

const addImagePage_display = async(req, res) => {
    try {
        const ctgs = await Category.findAll();
        const json_ctgs = await JSON.parse(JSON.stringify(ctgs));
        res.render('images-add', {
            title: 'Add Images',
            categoryData: json_ctgs
        }); 
    } catch (error) {
        res.end(error);
    }
};

//add Image
const addImage = async(req, res) => {
    try {
        const category = req.body.category;
        const images = req.files.image;
        console.log(images);
        //in case there is just one image
        if(Object.keys(req.files).length < 2){
            let imgExtension = images.name.substr(images.name.lastIndexOf('.') + 1); //get extension of the image
            let imgName = images.name.slice(0, images.name.lastIndexOf('.')); //get pure image name without extension
            images.name = `${imgName}-${Math.round(Math.random() * 1000)}-${category}.${imgExtension}`;
            let path = `/projet de stage/imgs/${images.name}`; 
            //store oon server
            await images.mv(path, (error) => {
                if(error)
                    throw error;
            });
            //store image's name in database
            await Image.create({
                image: images.name,
                category: category
            });
            //message
            req.flash('msgImage', 'Image added');
            //render images page
            res.redirect('/admin/images/');
        }
        else { //handle multiple images
            let imagesInfos = [];
            for(let image of images){
                let imgExtension = image.name.substr(image.name.lastIndexOf('.') + 1); //get extension of the image
                let imgName = image.name.slice(0, image.name.lastIndexOf('.')); //get pure image name without extension
                image.name = `${imgName}-${Math.round(Math.random() * 1000)}-${category}.${imgExtension}`;
                let path = `/projet de stage/imgs/${image.name}`; 
                await image.mv(path, (error) => {
                    if(error)
                        throw error;
                });
                imagesInfos.push({
                    image: image.name,
                    category: category
                });
            }
            await Image.bulkCreate(imagesInfos);
            //message
            req.flash('msgImage', 'Image added');
            //render images page
            res.redirect('/admin/images');
        }
    } catch (error) {
        res.end(error);
    }
};

//delete Image
const deleteImage = async(req, res) => {
    try {
        const idImg = req.params.idImg;
        const img = req.body.image;
        let path = `/projet de stage/imgs/${img}`;
        //delete image from server
        fs.unlinkSync(path);
        //delete from database
        await Image.destroy({
            where: {
                id_img: idImg
            }
        });
        req.flash('msgImage', 'Image deleted');
        res.redirect('/admin/images');
    } catch (error) {
        res.end(error);
    }
};

module.exports = {
    displayImages,
    addImagePage_display,
    addImage,
    deleteImage
};
