$(document).ready(function() {
    // up button start
    $('.up-btn').click(function(){
        window.scrollTo(0, 0);
    });
    // up button end
});

// side nav animation start
$('.burger-icon .show-btn').click(function(){
    // console.log('logged');
    $('.nav-bar').addClass('nav-bar-toggled');
});
$('.hide-btn').click(function(){
    $('.nav-bar').removeClass('nav-bar-toggled');   
});
// side nav animation end


// search bar (admin side: reservations) start
$('.rsvs-search input.rsv-search').on('keyup', function(){
    var infos = $(this).val().toUpperCase();
    $('.table-rsvs tr:gt(0)').filter(function(){
        $(this).toggle($(this).text().toUpperCase().indexOf(infos) > -1);//there is an index in table where values match
    });
});
// search bar (admin side: reservations) end

// telephone indicator by country start
    //initialize the phone indicator component
const phoneInputField = document.querySelector(".rsv-tel");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
       "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
    //get value of phone number in international format
$('.submit-rsv-form').click(function(){
    $('.rsv-tel').val(phoneInput.getNumber());
    console.log($('.rsv-tel').val());
});
// telephone indicator by country end

