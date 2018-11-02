console.log('interactive form test');

//if option value = "other"
  //create input field type "text" under options

$jobTitle = $("#title");
$jobInput = $("#jobInput");
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
