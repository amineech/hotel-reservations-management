const express = require('express');
const router = express.Router();

//controller
const type = require('../controllers/type.js');

router.get('/accommodations', type.displayTypes);

module.exports = router;