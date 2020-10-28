/* global $, Stripe */
//Documents ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form')
  var submitBtn = $('#form-submit-btn');

//Set Stripe public key
Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );

//When user clicks form submit button
submitBtn.click(function(event)){
  
  //Prevent default submission behaviour
  event.preventDefault();
  
  //Collect the credit card fields
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
  //Send card info to Stripe
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum,
    exp_month: card_month,
    exp_year: card_year
  }, stripeResponseHandler)
  
});

//Stripe will return card token

//Inject card token as a hidden field into the form 

//Submit form to our Rails app

});