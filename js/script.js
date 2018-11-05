console.log('interactive form test');

//if option value = "other"
  //create input field type "text" under options

$jobTitle = $("#title");
$jobInput = $("#input");
$otherLabel = $("#otherLabel");

function prependOption(){
  $("#color").prepend('<option selected disabled hidden>Choose a design </option>');
}

//Selecting "other" within the field will add or remove an input field.
//come back and make showInput();
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

//disable conflicting time schedules in field "activities"
//add up total costs later
  /*if a checkbox is check AND it conflicts with time, {
    disable check boxes that it disables.

    else enable checkboxes
}*/
//gather values of time based on array of inputs.
//$(".activities input")[i]
  //i = 0 none;
  //i = 1 conflicts with 3, 5
  // i = 2 conflicts with 4,6

$activity = $(".activities");
let activityEvents = $(".activities input");
$activity.change( function(){
  for (let i = 0; i < activityEvents.length; i++) {
  if($(".activities input")[i].checked&& i%2 != 0){
    console.log('checked');
    $(".activities input")[2*i+1].disabled = true;
    $(".activities input")[2*i+3].disabled = true;
    $(".activities input")[i].disabled = false;

  } else if($(".activities input")[i].checked&& i%2 === 0){
    console.log('unchecked');
    $(".activities input")[2*i+1].disabled = false;
    $(".activities input")[2*i+3].disabled = false;
    $(".activities input")[i].disabled = true;
}

});
