$(document).ready(function() {
  // declaring a players var
  var Players = [
    {
      name: "Luke Skwalker",
      HP: 150,
      attack: 20,
      counterAttack: 20,
      img: "./assets/images/luke-skywalker.png",
      adder: 5
    },
    {
      name: "Chewbacca",
      HP: 80,
      attack: 34,
      counterAttack: 34,
      img: "./assets/images/chewbacca.jpg",
      adder: 5
    },
    {
      name: "Obi-Wan Kenobi",
      HP: 160,
      attack: 15,
      counterAttack: 15,
      img: "./assets/images/obiwankenobi.jpg",
      adder: 12
    },
    {
      name: "Darth Maul",
      HP: 130,
      attack: 25,
      counterAttack: 25,
      img: "./assets/images/darth-maul.jpg",
      adder: 4
    }
  ];

  // first render to the page
  function firstRender() {
    var playersCard = [];
    // loop through players
    $(Players).each(function(i, p) {
      // create div with class of "player-card"
      var playerDiv = $("<div>");
      // declareneeded elements
      var playerImg = $("<img>");
      var playerName = $("<h3 id='name'>");
      var playerHP = $("<span id='hp'>");
      var playerAttack = $("<span id='attack'>");
      // changing values and attributes for the elements
      $(playerImg).attr("src", p.img);
      $(playerName).text(p.name);
      $(playerHP).text(p.HP);
      $(playerAttack).text(p.attack);
      $(playerDiv).addClass("player-card");
      // appending elements
      $(playerDiv).append($(playerImg));
      $(playerDiv).append($(playerName));
      $(playerDiv).append("<h4>Health points</h4>");
      $(playerDiv).append($(playerHP));
      $(playerDiv).append("<h4>Attack</h4>");
      $(playerDiv).append($(playerAttack));
      // pushing the div to the array
      playersCard.push(playerDiv);
    });
    // looping through the array and displaying player card on the screen
    $(playersCard).each(function(i, p) {
      $("#charachters").append(p);
    });
  }

  // calling first render
  firstRender();

  // lock (decide if to add the event or not)
  var attackerLock = false;
  var deffenderLock = false;
  var nextLock = true;

  // add event listeners
  ////// select attacker(charachter chosen)
  $(".player-card").on("click", function(e) {
    if (attackerLock === false) {
      $("#instructions").text("Pick an enemy");
      $(".fight-section").css("display", "flex");
      $(this).hide();
      $("#attacker").append(
        '<div class="player-card bg-success attacker">' +
          $(this).html() +
          "<div>"
      );
      attackerLock = true;
    }
    //////// selecting deffender(oponent)
    else if (attackerLock === true && deffenderLock === false) {
      $("#instructions").text("Fight");
      $(".fight-section").css("display", "flex");
      $(this).hide();
      $("#deffender").append(
        '<div class="player-card bg-danger deffender">' +
          $(this).html() +
          "<div>"
      );
      deffenderLock = true;
    } else if (
      attackerLock === true &&
      deffenderLock === true &&
      nextLock === false
    ) {
      $("#instructions").text("Fight another enemy");
      $(this).hide();
      $("#deffender").append(
        '<div class="player-card bg-danger deffender">' +
          $(this).html() +
          "<div>"
      );
    }
  });

  // handling attack button
  $("#attack img").on("click", function() {
    // getting attacker and deffender index by their name
    var attackerName = document.querySelector("#attacker #name").innerHTML;
    var deffenderName = document.querySelector("#deffender #name").innerHTML;
    var deffenderIndex = Players.map(function(e) {
      return e.name;
    }).indexOf(deffenderName);
    var attackerIndex = Players.map(function(e) {
      return e.name;
    }).indexOf(attackerName);

    // players oject found
    var attackerObject = Players[attackerIndex];
    var deffenderObject = Players[deffenderIndex];
    // check if oponent's health will go below 0 (if true add event listener to pick another enemy)
    if (deffenderObject.HP - attackerObject.attack <= 0) {
      //////// selecting deffender(oponent)
      $(".deffender").remove();
      nextLock = false;
    }
    // check if player's health will go below 0 (if true add event listener to pick another enemy)
    if (attackerObject.HP - deffenderObject.attack <= 0) {
      // call reset method and return
      reset();
    }
    // declaring a var caled log and updating its value
    var log = "";
    log +=
      "You attacked " +
      deffenderName +
      " for " +
      attackerObject.attack +
      " he attacked you back for " +
      deffenderObject.attack;

    // change values and updating DOM
    attackerObject.HP -= deffenderObject.attack;
    deffenderObject.HP -= attackerObject.attack;
    attackerObject.attack += attackerObject.adder;
    $("#log").html(log);
    $("#deffender #hp").html(deffenderObject.HP);
    $("#attacker #hp").html(attackerObject.HP);
    $("#attacker #attack").html(attackerObject.attack);
  });

  // reset method
  function reset() {
    location.reload();
  }
});
