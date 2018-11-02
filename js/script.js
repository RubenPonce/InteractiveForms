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
//Change design options on button pres.
    $shirtDesign = $("#design");
    prependOption();
    $shirtDesign.change( function(){
    $shirtOptions = $("#color option")
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
