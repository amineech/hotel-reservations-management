const express = require('express');
const router = express.Router();



//controller
const image = require('../controllers/image.js');

//get images page
router.get('/admin/images', image.displayImages);

//get 'add image' page
router.get('/admin/images/add', image.addImagePage_display);

//add image
router.post('/admin/images/added', image.addImage);

//delete Image
router.post('/admin/images/delete/:idImg', image.deleteImage);

module.exports = router;