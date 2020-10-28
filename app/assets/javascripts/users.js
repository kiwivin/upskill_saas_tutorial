/* global $, Stripe */
//Documents ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');

  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When user clicks form submit button
  submitBtn.click(function(event){
    
    //Prevent default submission behaviour
    event.preventDefault();
    
    //Collect the credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Use Stripe JS library to check for card errors
    var error = false;
    
    //Validate card number
    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }
    
    //Validate CVC
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }  
    
      //Validate expiration date
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The credit card expiry date appears to be invalid');
    }
    
    if (error) {
      //If there are card errors dont send to Stripe
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
       //Send card info to Stripe
        Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expMonth,
          exp_year: expYear
        }, stripeResponseHandler);
    }
    return false;
  });
  
  //Stripe will return card token
  function stripeResponseHandler(status, response) {
    //Get token from the response
    var token = response.id;
  
    //Inject card token as a hidden field into the form
    theForm.append($('<input typr="hidden" name="user[stripe_card_token]">').val(token) );
    
    //Submit form to our Rails app
    theForm.get(0).submit();
  }
});