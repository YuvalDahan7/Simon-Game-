var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClicksPattern = [];

var started = false;
var Level = 0;

$(document).keypress(function() {
    if(!started) {
        $("h1").text("Level " + Level);
    }
    nextSequence();
    started = true;
})

$("button").click(function() {
    userChosenColor = this.innerHTML;
    userClicksPattern.push(userChosenColor);

    console.log(userClicksPattern);
    palySound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClicksPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClicksPattern[currentLevel]) {
        if(userClicksPattern.length === gamePattern.length)
            setTimeout(function () {
                nextSequence()
            }, 1000);
    } 
    else{
        $("h1").text("Final result: Level " + (Level - 1) + ", Press a key to start.")
        palySound("wrong");
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userClicksPattern = [];
    Level++;
    $("h1").text("Level " + Level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    palySound(randomChosenColour);
}

function startOver() {
    Level = 0;
    gamePattern = [];
    started = false;
}

function palySound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var tmpBtn = $("#" + currentColor);
    tmpBtn.addClass("pressed");

    setTimeout(function(){
        tmpBtn.removeClass("pressed")
    }, 150);
}