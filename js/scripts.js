var players = ["Anki","Arilou","Big Pimpintosh","Daffy","Delthius","DoctorProfessorSirIsaac","EELuminatus",
               "elverdulerojorge","Enamel","Epicosity","FleurDeLys","Gigger Goris III","Heartseed",
               "Horus The Holy","Jakobi","James Bowring","JetEriksen","Jvela","Kerpa","Kin_Replica",
               "Kolaru","Legomann96","Marmu","Melvinfro","Mishi","mocaccino","MrZiggy","niccolaccio",
               "Pigeon Rush","PremiumBow","qq","Raben Lied","roman","SassyMarquess","snetch",
               "Tiki Gray","TheChild","ThisGuy","Trumpet","Wyld Kin"];
players.sort();

function refreshUnitBans() {
  var selectedUnits = [];
  $.each($(".unitBanCheckboxes:checked"), function() {
    selectedUnits.push($(this).attr("id"))
  })
  
  $("#unitcirclecontainer").empty()
  $("#overlaynosign").empty()
  $.each(selectedUnits, function() {
    $("#unitcirclecontainer").append(`<img class="unitCircle" src="images/units/${this}.png">`)
    $("#overlaynosign").append(`<img class="nosignCircle" src="images/units/nosign.png">`)
  })
}

var unitBanLimit = 2;
$("input.unitBanCheckboxes").on("change", function(evt) {
  if ($(this).siblings(":checked").length >= unitBanLimit) {
    this.checked = false;
  }
  refreshUnitBans();
})

function changePlayer(idName) {
  var idInputName = idName.slice(0,6) + "Input"
  var playerName = $("#" + idInputName).val()
  $("#" + idName).html(playerName);

  var playerNo = idName.slice(0,2)
  var url = `images/picons/${playerName.toLowerCase()}.png`
  $.get(url)
    .done(function() {
      $(`#${playerNo}ProfilePic`).css("background", `url('${url}')`)
      $(`#${playerNo}ProfilePic`).css("background-size", "100%")
      $(`#${playerNo}ProfilePic`).css("background-repeat", "no-repeat")
      $(`#${playerNo}ProfilePic`).css("box-shadow", "inset 0px 3px 4px black")
    }).fail(function() {
      $(`#${playerNo}ProfilePic`).css("background", "none")
      $(`#${playerNo}ProfilePic`).css("box-shadow", "none")
    })
}

function changeWeight() {
  if ($("#p2Weight").val() === "") {
    $("#p2WeightText").html("");
  } else {
    $("#p2WeightText").html("Weight - " + $("#p2Weight").val());
  }
}

$("[name='p1color']").click(function () {
  var pcolor = $("[name='p1color']:checked").attr("id");
  pcolor = pcolor.slice(0, -1);
  if (pcolor === "red") {
    $("#p1NameText").removeClass("blue")
    $("#p1NameText").removeClass("green")
    $("#p1NameText").removeClass("yellow")
    $("#p1NameText").addClass("red")
  } else if (pcolor === "blue") {
    $("#p1NameText").removeClass("red")
    $("#p1NameText").removeClass("green")
    $("#p1NameText").removeClass("yellow")
    $("#p1NameText").addClass("blue")
  } else if (pcolor === "green") {
    $("#p1NameText").removeClass("blue")
    $("#p1NameText").removeClass("red")
    $("#p1NameText").removeClass("yellow")
    $("#p1NameText").addClass("green")
  } else if (pcolor === "yellow") {
    $("#p1NameText").removeClass("blue")
    $("#p1NameText").removeClass("green")
    $("#p1NameText").removeClass("red")
    $("#p1NameText").addClass("yellow")
  }
});

$("[name='p2color']").click(function () {
  var pcolor = $("[name='p2color']:checked").attr("id");
  pcolor = pcolor.slice(0, -1);
  if (pcolor === "red") {
    $("#p2NameText").removeClass("blue")
    $("#p2NameText").removeClass("green")
    $("#p2NameText").removeClass("yellow")
    $("#p2NameText").addClass("red")
  } else if (pcolor === "blue") {
    $("#p2NameText").removeClass("red")
    $("#p2NameText").removeClass("green")
    $("#p2NameText").removeClass("yellow")
    $("#p2NameText").addClass("blue")
  } else if (pcolor === "green") {
    $("#p2NameText").removeClass("blue")
    $("#p2NameText").removeClass("red")
    $("#p2NameText").removeClass("yellow")
    $("#p2NameText").addClass("green")
  } else if (pcolor === "yellow") {
    $("#p2NameText").removeClass("blue")
    $("#p2NameText").removeClass("green")
    $("#p2NameText").removeClass("red")
    $("#p2NameText").addClass("yellow")
  }
});

$("#p1ScoreText").click(function() {
  $(this).html(parseInt($(this).html(),10)+1);
});

$("#p2ScoreText").click(function() {
  $(this).html(parseInt($(this).html(),10)+1);
});

$("#p1ScoreText").contextmenu(function() {
  $(this).html(parseInt($(this).html(),10)-1);
});

$("#p2ScoreText").contextmenu(function() {
  $(this).html(parseInt($(this).html(),10)-1);
});

// for updating all texts after using the autofiller
function refreshTexts() {
  changePlayer("p1NameText");
  changePlayer("p2NameText");
}

// autocompletion code from https://www.w3schools.com/howto/howto_js_autocomplete.asp

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
      refreshTexts();  // added this line to make the autofill update the texts
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }