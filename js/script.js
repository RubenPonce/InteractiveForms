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

// if CHECKED && has label regex(9AM){
//   disable any checkbox that is UNCHECKED that has regex(9AM)
// } else if CHECKED = FALSE{
//enable any checkbox that is UNCHECKED that has regex(9AM)
//}

  //i = 0 none;
  //i = 1 conflicts with 3, 5
  // i = 2 conflicts with 4,6

$activity = $(".activities");
$activityEvents = $(".activities input");
const labelofInputAM = /Tuesday ?9[a][m]/;
const labelofInputPM = /Tuesday ?1[p][m]/;
  let morningActivity = [];
  let dayActivity = [];
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

$activityEvents.change(function(e){
  for (let i = 0; i < morningActivity.length; i++) {
  if(e.target.className==="morningTime"){
      morningActivity[i].disabled = true;
      e.target.disabled = false;
    }if(e.target.checked ===false&&e.target.className ==="morningTime"){
      morningActivity[i].disabled = false;
    }
  }
  for (let i = 0; i < dayActivity.length; i++) {
  if(e.target.className==="dayTime"){
      dayActivity[i].disabled = true;
      e.target.disabled = false;
    }if(e.target.checked ===false&&e.target.className ==="dayTime"){
      dayActivity[i].disabled = false;
    }
  }

  // if($activityEvents[i].checked){
  //   $activityEvents[i].disabled = false;
  // } else if(e.target.checked===false){
  //   $activityEvents[i].disabled = false;
  // }


});
