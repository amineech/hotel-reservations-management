//reservation form controller

//models
const Reservation = require('../models/Reservation.js');
const Category = require('../models/Category.js');


//get the booking form
const book_displayForm = async(req, res) => {
    try {
        const { idCategory } = req.params;
        const { date_checkin, date_checkout, gobackID } = req.body; //to get the page of offer with same category
        const today = new Date();
        const d_in = new Date(date_checkin);
        const d_out = new Date(date_checkout);
        //convert to milliseconds
        const d_in_mill = d_in.getTime();
        const d_out_mill = d_out.getTime(); 
        //dates validations
        if( (d_in_mill > d_out_mill) || (d_in_mill < today.getTime()) || (d_out_mill < today.getTime()) ) {
            req.flash('messageOffer', "Invalid Dates");
            return res.redirect(`/offer/details/${gobackID}`);
        } else {
            //get category data
            const category = await Category.findAll({
                where: { id_category: idCategory }
            });
            //json
            const json_ctg = await JSON.parse(JSON.stringify(category));

            res.render('formulaire', {
                title: 'Booking Form',
                checkin: date_checkin,
                checkout: date_checkout,
                goback: gobackID,
                thecategory: json_ctg
            });
        }
    } catch (error) {
        res.end(error);
    }
}

//booking process
const booked = async(req, res) => {
    try {
        const { 
            firstname,
            lastname,
            tel,
            email,
            checkin,
            checkout,
            category,
            goback
            } = req.body;

        //store reservation
        await Reservation.create({
            nom: firstname.trim().toUpperCase(),
            prenom: lastname.trim().toUpperCase(),
            telephone: tel.trim().toUpperCase(),
            email: email.trim(),
            date_checkin: checkin,
            date_checkout: checkout,
            category: category
        }, {
            fields: [//fields to be filled
                'nom', 'prenom', 'telephone', 'email', 'date_checkin', 'date_checkout', 'category'
            ]
        });
        req.flash('messageBooked', 'Your reservation is sent successefully\nWe will get in touch with you soon for confirmation');
        res.redirect(`/offer/details/${goback}`);
    } catch (error) {
        res.end(error);
    }
}

module.exports = {
    book_displayForm,
    booked
};