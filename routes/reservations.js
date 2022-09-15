const express = require('express');
const router = express.Router();

//controller
const reservation = require('../controllers/reservation.js');

//get reservations page
router.get('/admin/reservations',  reservation.displayReservations);

//delete reservation
router.post('/admin/reservations/delete/:idReservation', reservation.deleteReservation);

//confirm reservation
router.post('/admin/reservations/confirm/:idReservation', reservation.confirmReservation);

//show reservation
router.get('/admin/reservations/show/:idReservation', reservation.reservation_showMore);

module.exports = router;