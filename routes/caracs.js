const express = require('express');
const router = express.Router();

//controller
const carac = require('../controllers/carac.js');

//caracs page
router.get('/admin/caracs', carac.displayCaracs);

//delete carac
router.post('/admin/caracs/delete/:idCrc', carac.deleteCarac);

//'add carac' page
router.get('/admin/caracs/add', carac.carac_displayAdd);

//add carac
router.post('/admin/caracs/add', carac.addCarac);

//'edit carac' page
router.get('/admin/caracs/edit/:idCrc', carac.carac_displayEdit);

//edit carac
router.post('/admin/caracs/edited', carac.editCarac);

module.exports = router;