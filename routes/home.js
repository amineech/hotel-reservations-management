const express = require("express")

const router = express.Router();

//controller
const home = require('../controllers/home.js');

//home page
router.get('/', home.home);

module.exports = router;