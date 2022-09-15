//express framework
const express = require('express');
//template engine 
const handlebars = require('express-handlebars');
//file upload (for images)
const fileupload = require('express-fileupload');

//create app object
const app = express();

//session module
const session = require('express-session');
    //set up
app.use(session({
    secret:'flashMessages',
    saveUninitialized: true,
    resave: true
}));

//flash module for messages
const flash = require('connect-flash');
app.use(flash());

//------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
//------------------------------------------------------
//initialize file-upload
app.use(fileupload());

//serving static files start----------------------------------
app.use(express.static(__dirname  + '/public'));
app.use('/admin', express.static(__dirname + '/public'));
app.use('/admin/categories', express.static(__dirname + '/public'));
app.use('/admin/categories/edit', express.static(__dirname + '/public'));
app.use('/admin/categories/add', express.static(__dirname + '/public'));
app.use('/admin/rooms', express.static(__dirname + '/public'));
app.use('/admin/rooms/add', express.static(__dirname + '/public'));
app.use('/admin/rooms/edit', express.static(__dirname + '/public'));
app.use('/admin/caracs', express.static(__dirname + '/public'));
app.use('/admin/caracs/edit', express.static(__dirname + '/public'));
app.use('/admin/caracs/add', express.static(__dirname + '/public'));
app.use('/admin/images', express.static(__dirname + '/public'));
app.use('/admin/images/add', express.static(__dirname + '/public'));
app.use('/types', express.static(__dirname + '/public'));
app.use('/offer/details', express.static(__dirname + '/public'));
app.use('/book', express.static(__dirname + '/public'));
app.use('/admin/reservations', express.static(__dirname + '/public'));
app.use('/admin/reservations/show', express.static(__dirname + '/public'));
//serving static files end----------------------------------

//serving images from server start
app.use(express.static( __dirname + '/imgs'));
//serving images from server end

//port
const PORT = 3000;


//set up handlebars engine
app.engine('hbs', handlebars.engine({
    defaultLayout:'main',
    extname:'.hbs',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

//Home page start
app.get('/', require('./routes/home.js'));
//Home page end

//admin side routes start
    //admin home
app.get('/admin', require('./routes/admin.js'));
    //categories page
app.get('/admin/categories', require('./routes/categories.js')); 
    //delete category
app.post('/admin/categories/delete/:idCategory', require('./routes/categories.js'));
    //edit category page
app.get('/admin/categories/edit/:idCategory', require('./routes/categories.js'));
    //edit category
app.post('/admin/categories/edited', require('./routes/categories.js'));
    //add category page
app.get('/admin/categories/add', require('./routes/categories.js'));
    //add category
app.post('/admin/categories/add', require('./routes/categories.js'));
    //caracs page
app.get('/admin/caracs', require('./routes/caracs.js'));
    //delete carac
app.post('/admin/caracs/delete/:idCrc', require('./routes/caracs.js'));
    //add carac page
app.get('/admin/caracs/add', require('./routes/caracs.js'));
    //add carac
app.post('/admin/caracs/add', require('./routes/caracs.js'));
    //'edit carac' page
app.get('/admin/caracs/edit/:idCrc', require('./routes/caracs.js'));
    //edit carac
app.post('/admin/caracs/edited', require('./routes/caracs.js'));
    //get images page
app.get('/admin/images', require('./routes/images.js'));
    //get add-images page
app.get('/admin/images/add', require('./routes/images.js'));
    //add image
app.post('/admin/images/added', require('./routes/images.js'));
    //delete Image
app.post('/admin/images/delete/:idImg', require('./routes/images.js'));
    //reservations page
app.get('/admin/reservations', require('./routes/reservations.js'));
    //delete reservation
app.post('/admin/reservations/delete/:idReservation', require('./routes/reservations.js'));
    //show reservation infos
app.get('/admin/reservations/show/:idReservation', require('./routes/reservations.js'));
    //confirm reservation by admin
app.post('/admin/reservations/confirm/:idReservation', require('./routes/reservations.js'));
    //get rooms page
app.get('/admin/rooms', require('./routes/rooms.js'));
    //get add room page
app.get('/admin/rooms/add', require('./routes/rooms.js'));
    //add room
app.post('/admin/rooms/add', require('./routes/rooms.js'));
    //get edit room page
app.get('/admin/rooms/edit/:idRoom', require('./routes/rooms.js'));
    //edit room
app.post('/admin/rooms/edit', require('./routes/rooms.js'));
    //delete room
app.post('/admin/rooms/delete/:idRoom', require('./routes/rooms.js'));
// admin side routes end

// client side routes start
    //'types' page
app.get('/accommodations', require('./routes/types.js'));
    //offer details page
app.get('/offer/details/:idCategory', require('./routes/offers.js'));
    //get booking form
app.post('/book/:idCategory', require('./routes/formulaire.js'));
    //booking 
app.post('/booked', require('./routes/formulaire.js'));
// client side routes end



 app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
 });