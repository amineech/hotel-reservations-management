const express = require('express');
const router = express.Router();

//controller
const formulaire = require('../controllers/formulaire.js');

//'formulaire' page
router.post('/book/:idCategory', formulaire.book_displayForm);

//booking process 
router.post('/booked', formulaire.booked);

module.exports = router;