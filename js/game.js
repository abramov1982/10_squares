const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let countHits = 1;
let countMiss = 0;

function round() {
  $(".target").empty();
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(".target").text(countHits);
  countHits += 1;
  if (hits === maxHits) {
    endGame();
    countHits = 1;
  }
}

function endGame() {
  $("#play-field").fadeOut();
  let totalPlayedMillis = Date.now() - firstHitTime;
  console.log(totalPlayedMillis);
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#count-miss").text(countMiss);
  $("#result-message").show();
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits += 1;
    round();
  }
  else {
    $(event.target).addClass("miss")
    countMiss += 1;
  } 
}

function init() {
  $("#button-start").click(function() {
    round();
    countMiss = 0;
    $("#button-start").hide();
    $("#button-reload").show();
    firstHitTime = Date.now();
  });
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    $("#play-field").fadeIn();
    $("#result-message").hide();
    firstHitTime = Date.now();
    hits = 0;
    countHits = 1;
    countMiss = 0;
    round();
  });
}

$(document).ready(init);
