console.log('interactive form test');

//if option value = "other"
  //create input field type "text" under options

$jobTitle = $("#title option");
for (var i = 0; i < $jobTitle.length; i++) {
  if($jobTitle[i].value === "other")
  $("#title").parent().append('<input></input>');
}
