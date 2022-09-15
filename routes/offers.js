const express = require('express');
const router = express.Router();

//controller
const offer = require('../controllers/offer.js');

router.get('/offer/details/:idCategory', offer.category_details);

module.exports = router;