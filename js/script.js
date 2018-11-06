console.log('interactive form test');

//if option value = "other"
  //create input field type "text" under options
/*-----------------Job Title-----------------*/


function prependOption(){
  $("#color").prepend('<option selected disabled hidden>Choose a design </option>');
}

//Selecting "other" within the field will add or remove an input field.
//come back and make showInput();
$jobTitle = $("#title");
$jobInput = $("#input");
$otherLabel = $("#otherLabel");

$otherLabel.hide();
$jobInput.hide();
$jobTitle.change( function(){
  if( $(this).val() === 'other'){
    $otherLabel.show();
      $jobInput.show();
    }
      else{
        $otherLabel.hide();
        $jobInput.hide();
      }
  });
//colors must match design with jQuery. However All options in HTML must be displayed
//Change design options on option press.
//come back and hide the color option until press.
/*-----------------Shirt Design-----------------*/
$shirtDesign = $("#design");
prependOption();
$shirtDesign.change( function(){
  $shirtOptions = $("#color option")
  //selects only js pun designs
  if($(this).val()==="js puns"){
      for (let i = 0; i < $shirtOptions.length; i++) {
          if(i>3){
          $($shirtOptions[i]).hide();
        }
        else {
          $($shirtOptions[i]).show();
        }
      }
    }
    //selects only heart js designs
    if($(this).val()==="heart js"){
      for (let i = 0; i < $shirtOptions.length; i++) {
          if(i<=3){
          $($shirtOptions[i]).hide();
        }
          else {
          $($shirtOptions[i]).show();
        }
      }
    }
  });


/*-----------------Events for the conference-----------------*/
$activityEvents = $(".activities input");
const labelofInputAM = /Tuesday ?9[a][m]/;
const labelofInputPM = /Tuesday ?1[p][m]/;
  let morningActivity = [];
  let dayActivity = [];
  /*create arrays based on timing of the events that conflict by gathering
   a conflicting event using regex and declare a class name*/
  for (let i = 0; i < $activityEvents.length; i++) {
    if(labelofInputAM.test($activityEvents.parent()[i].textContent)){
        morningActivity.push($activityEvents[i]);
        $activityEvents[i].className = 'morningTime';
      }
      else if (labelofInputPM.test($activityEvents.parent()[i].textContent)){
        dayActivity.push($activityEvents[i])
        $activityEvents[i].className = 'dayTime';
      }
  }
//makes the events  disable if they are at conflicting times
$activityEvents.change(function(e){
  //disables any morning event that conflicts with the selected event
  for (let i = 0; i < morningActivity.length; i++) {
  if(e.target.className==="morningTime"){
      morningActivity[i].disabled = true;
      e.target.disabled = false;
    }if(e.target.checked ===false&&e.target.className ==="morningTime"){
      morningActivity[i].disabled = false;
    }
  }
  //diables any day time event that conflicts with the selected event
  for (let i = 0; i < dayActivity.length; i++) {
  if(e.target.className==="dayTime"){
      dayActivity[i].disabled = true;
      e.target.disabled = false;
    }if(e.target.checked ===false&&e.target.className ==="dayTime"){
      dayActivity[i].disabled = false;
    }
  }
});
/*-----------------Payment Options-----------------*/
$paymentOptions = $("#payment option");
$creditCardDetails = $("#credit-card");
$paypal = $("p")[0];
$bitcoin = $("p")[1];
$($paypal).hide();
$($bitcoin).hide();
$("#payment option")[1].selected = true;
$("#payment").change(function(){
  if($(this).val()!="creditCard" || $(this).val()!= "paypal" || $(this).val()!="bitcoin"){
    $creditCardDetails.hide();
    $($paypal).hide();
    $($bitcoin).hide();
  }
  if($(this).val() ==="creditCard") {
    $creditCardDetails.show();
} else if($(this).val()==="paypal"){
        $($paypal).show();
} else if($(this).val()==="bitcoin"){
          $($bitcoin).show();
}

});

/*-----------------Validations-----------------*/
/*add validation to the name
Form validation
If any of the following validation errors exist, prevent the user from submitting the form:
Name field can't be blank.
Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
User must select at least one checkbox under the "Register for Activities" section of the form.
If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
Credit Card field should only accept a number between 13 and 16 digits.
The Zip Code field should accept a 5-digit number.
The CVV should only accept a number that is exactly 3 digits long.
*/
//select name input field value
//create regex
//if regex test name input value is not true
//let the user know they're dumb
const nameRegex = /^[A-Za-z]+$/;
$("#name").change(function(){
  console.log($(this).val());
  if( nameRegex.test( $(this).val() ) ){
    console.log("this is totally valid");
      $("#name").removeClass("invalidStyle");
      $("#name").prev().text("Name:")
  } else {
    $("#name").addClass("invalidStyle");
    $("#name").prev().append(" <span style = 'color: red'>*Please enter a valid name</span>");
    console.log("this is invalid");
  }
});
