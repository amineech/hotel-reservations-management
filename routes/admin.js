const express = require('express');
const router = express.Router();

//controller
const admin = require('../controllers/admin.js');

//admin home page
router.get('/admin', admin.displayAdmin);

module.exports = router;