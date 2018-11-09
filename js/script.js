/*-----------------Function Declarations-----------------*/
function preventForm() {
  $("form").on("click", function(e) {
    e.preventDefault();
  });
}
function enableForm() {
  $("form").on("click", function(e) {
    $("form").unbind("click");
  });
}
// else {
//   $("form").on("click"), function(e){
//     $("form").
//   }
// }

function toggleValidClass(idValue, addFirst) {
  if (addFirst === "first") {
    idValue.addClass("validStyle");
    idValue.removeClass("invalidStyle");
    enableForm();
  } else {
    idValue.addClass("invalidStyle");
    idValue.removeClass("validStyle");
    preventForm();
  }
}

function validation(regexVal, idVal, text) {
  $(idVal).change(function() {
    if (regexVal.test($(this).val())) {
      toggleValidClass(idVal, "first");
      enableForm();
      idVal.prev().text(`${text}`);
    } else {
      if (idVal.prop("class") != "invalidStyle") {
        idVal
          .prev()
          .append(`<span style = 'color: red'> *enter a valid ${text}</span>`);
      }
      toggleValidClass(idVal, "last");
      preventForm();
    }
  });
}

function displayShirtColors(idValue) {
  if (idValue.val() === "js puns") {
    for (let i = 0; i < $shirtOptions.length; i++) {
      if (i > 3) {
        $($shirtOptions[i]).hide();
      } else {
        $($shirtOptions[i]).show();
      }
    }
  }
  //selects only heart js designs
  if (idValue.val() === "heart js") {
    for (let i = 0; i < $shirtOptions.length; i++) {
      if (i <= 3) {
        $($shirtOptions[i]).hide();
      } else {
        $($shirtOptions[i]).show();
      }
    }
  }
}

function prependOption() {
  $("#color").prepend(
    "<option selected disabled hidden>Choose a design </option>"
  );
}

function otherJobTitle() {
  $otherLabel.hide();
  $jobInput.hide();
  $jobTitle.change(function() {
    if ($(this).val() === "other") {
      $otherLabel.slideDown(500);
      $jobInput.slideDown(500);
    } else {
      $otherLabel.delay(250).slideUp(250);
      $jobInput.slideUp(250);
    }
  });
}

function testRegex(regex, newArray, parentArray, desiredClass, counter) {
  if (regex.test(parentArray.parent()[counter].textContent)) {
    newArray.push(parentArray[counter]);
    parentArray[counter].className = desiredClass;
  }
}

function disableCheckboxes(array, className, event) {
  for (let i = 0; i < array.length; i++) {
    if (event.target.className === className) {
      array[i].disabled = true;
      event.target.disabled = false;
    }
    if (
      event.target.checked === false &&
      event.target.className === className
    ) {
      array[i].disabled = false;
    }
  }
}
/*-----------------Variable Declarations-----------------*/
//focus on name text field
$("#name").focus();
//job title declarations
$jobTitle = $("#title");
$jobInput = $("#input");
$otherLabel = $("#otherLabel");
//activity event declarations
$activityEvents = $(".activities input");
let totalCost = 0;
const labelofInputAM = /Tuesday ?9[a][m]/;
const labelofInputPM = /Tuesday ?1[p][m]/;
const eventRegex = /[^\$]\d*$/;
let morningActivity = [];
let dayActivity = [];
//shirt design declarations
$shirtDesign = $("#design");
prependOption();
//payment declarations
$paymentOptions = $("#payment option");
$creditCardDetails = $("#credit-card");
$paypal = $("p")[0];
$bitcoin = $("p")[1];
$($paypal).hide();
$($bitcoin).hide();

/*-----------------Job Title-----------------*/
//hides text input field from view until "other" occupation is selected
otherJobTitle();
/*-----------------Shirt Design-----------------*/

//hide the color options on page load
$("#colors-js-puns").hide();
$shirtDesign.change(function() {
  $shirtOptions = $("#color option");
  //show or hide the color options if a value is selected
  if ($("#design").val() === "js puns" || $("#design").val() === "heart js") {
    $("#colors-js-puns").show();
  } else if ($("#design").val()) {
    $("#colors-js-puns").hide();
  }
  displayShirtColors($(this));
});
/*-----------------Events for the conference-----------------*/
/*create arrays based on timing of the events that conflict by gathering
   a conflicting event using regex and declare a class name*/
   let checked = $("input:checked");
   checked.length = 0;
for (let i = 0; i < $activityEvents.length; i++) {
  testRegex(labelofInputAM, morningActivity, $activityEvents, "morningTime", i);
  testRegex(labelofInputPM, dayActivity, $activityEvents, "dayTime", i);
}
//makes the events  disable if they are at conflicting times
$activityEvents.change(function(e) {
  //enables submit form when checkbox is clicked
  $("button").unbind("click");
  //disables any morning event or day event that conflicts with the selected event
  disableCheckboxes(morningActivity, "morningTime", e);
  disableCheckboxes(dayActivity, "dayTime", e);
  //add up total costs of events that are checked
  if (e.target.checked) {
    totalCost += +eventRegex.exec(e.target.parentElement.textContent)[0];
  } else if (e.target.checked === false) {
    totalCost += -+eventRegex.exec(e.target.parentElement.textContent)[0];
  }
  if ($(".activities p")) {
    $(".activities p").remove();
  }
  $(".activities").append(
    $(`<p class = "money">Total Cost: $${totalCost}</p>`)
      .hide()
      .fadeIn(500)
  );
  //validation for checkboxes
  checked = $("input:checked");
  if (checked.length === 0) {
    $("button").on("click", e => {
      e.preventDefault();
    });
  } else if (checked.length > 0) {
    // $("button").on("click",(e)=>{
    $("button").unbind("click");
    // });
  }
});

/*-----------------Payment Options-----------------*/
$("#payment option")[1].selected = true;
$("#payment").change(function() {
  if (
    $(this).val() != "creditCard" ||
    $(this).val() != "paypal" ||
    $(this).val() != "bitcoin"
  ) {
    $creditCardDetails.slideUp(500);
    $($paypal).slideUp(250);
    $($bitcoin).slideUp(250);
  }
  if ($(this).val() === "creditCard") {
    $creditCardDetails.slideDown(500);
  } else if ($(this).val() === "paypal") {
    $($paypal).show();
  } else if ($(this).val() === "bitcoin") {
    $($bitcoin).show();
  }
});
/*-----------------Form Validation-----------------*/
//Validation for the Name input
validation(/^[A-Za-z]+ ?[A-Za-z]* ?[A-Za-z]* ?$/, $("#name"), "Name:");
//Validation for Email input
validation(
  /^[A-Za-z0-9]*?_?[A-Za-z0-9]+@[A-Za-z0-9]*.[c][o][m]$/,
  $("#mail"),
  "E-mail: "
);
//Validation for Credit Card
if($("#payment option")[1].selected){
validation(/^\d{16}|\d{13}$/, $("#cc-num"), "Credit Card Number:");
//validate zipcode
validation(/^\d{5}/, $("#zip"), "Zip Code: ");
//validation for cvv
validation(/^\d{3}/, $("#cvv"), "CVV: ");
$("form").on("submit", () => {
  if ($("#cc-num").val() === ""||$("#zip").val() === ""||$("#cvv").val() === ""||checked.length === 0) {
    return false;
  }
});
}

//while input fields are empty, do not submit form.
$("form").on("submit", () => {
  if (
    $("#name").val() === "" ||
    $("#mail").val() === ""
  ) {
    return false;
  }

});
