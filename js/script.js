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
//hide the color options on page load
$("#colors-js-puns").hide();
$shirtDesign.change( function(){
  $shirtOptions = $("#color option")
//show or hide the color options if a value is selected
if($("#design").val()=== "js puns"||$("#design").val()==="heart js"){
  $("#colors-js-puns").show();
} else if($("#design").val()){
  $("#colors-js-puns").hide();
}
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
let totalCost= 0;
const labelofInputAM = /Tuesday ?9[a][m]/;
const labelofInputPM = /Tuesday ?1[p][m]/;
const eventRegex = /[^\$]\d*$/;
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
    }if(e.target.checked ===false&& e.target.className ==="dayTime"){
      dayActivity[i].disabled = false;
    }
  }//cost = x
  //cost = cost+ x
  //add up total costs of events that are checked
      if(e.target.checked){
        console.log(e.target);
      totalCost += +eventRegex.exec(e.target.parentElement.textContent)[0];
    } else if(e.target.checked === false){
      totalCost += -+eventRegex.exec(e.target.parentElement.textContent)[0];
    }
    console.log(totalCost);
    if($(".activities p")){
      $(".activities p").remove();
    }
    $(".activities").append(`<p class = "money">Total Cost: $${totalCost}</p>`);
//validation for activities
    if(totalCost===0){
        $("form").addClass("invalidStyle");
      $(".activities").append("<span style = 'color:red'> *Please select at least one event</span>");
    } else if(totalCost>0){
      $("form").removeClass("invalidStyle");
      $(".activities span").text("");
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

/*-----------------Form Validation-----------------*/

//Validation for the Name input
const nameRegex = /^[A-Za-z]+ ?[A-Za-z]* ?[A-Za-z]* ?$/;
$("#name").change(function(){
  console.log($(this).val());
  if( nameRegex.test( $(this).val() ) ){
    console.log("this is totally valid");
      $("#name").addClass("validStyle");
      $("#name").removeClass("invalidStyle");
      $("#name").prev().text("Name:")
  } else {
    if($("#name").prop("class")!= "invalidStyle"){
    $("#name").prev().append(" <span style = 'color: red'>*Please enter a valid name</span>");
  }
    $("#name").removeClass("validStyle");
    console.log("this is invalid");
    $("#name").addClass("invalidStyle");
  }
});
//validation for Email input
const emailRegex = /^[A-Za-z0-9]*?_?[A-Za-z0-9]+@[A-Za-z0-9]*.[c][o][m]$/;
$("#mail").change(function(){
  console.log($(this).val());
  if( emailRegex.test( $(this).val() ) ){
    console.log("this is totally valid");
      $("#mail").addClass("validStyle");
      $("#mail").removeClass("invalidStyle");
      $("#mail").prev().text("E-mail:")
  } else {
    if($("#mail").prop("class")!= "invalidStyle"){
    $("#mail").prev().append(" <span style = 'color: red'>*Please enter a valid e-mail</span>");
  }
    $("#mail").removeClass("validStyle");
    console.log("this is invalid");
    $("#mail").addClass("invalidStyle");
  }
});
