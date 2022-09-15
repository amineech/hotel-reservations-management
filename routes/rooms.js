const express = require("express");

const router = express.Router();

//controller
const room = require('../controllers/room.js'); 

//get rooms page
router.get('/admin/rooms', room.displayRooms);

//get add room page
router.get('/admin/rooms/add', room.display_addRoom);

//add room
router.post('/admin/rooms/add', room.addRoom);

//get edit room page
router.get('/admin/rooms/edit/:idRoom', room.display_editRoom);

//edit room
router.post('/admin/rooms/edit', room.editRoom);

//delete room
router.post('/admin/rooms/delete/:idRoom', room.deleteRoom);

module.exports = router;