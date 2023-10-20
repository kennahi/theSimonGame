var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var playerTurn = 0;
var count = 1;


//Generate a random number for the color sequences + plays the sound + animation
function nextSequence() {
    var randomNumber;
    var randomChosenColor;

    level++;
    $("h1").html("Level " + level);

    randomNumber = Math.floor(Math.random() * 4);

    if (count < gamePattern.length) {
        playerTurn = 1;
    }
    else {
        randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
        playSound(randomChosenColor);
        playerTurn = 1;
        count = 1;
    }
}

//user pattern
$(".btn").click(function () {
    if (playerTurn === 1) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        if (userClickedPattern[count - 1] != gamePattern[count - 1]) {
            Gameover();
            return;
        }
        else {
            count++;
        }

        if (count > gamePattern.length) {
            userClickedPattern = [];
            playerTurn = 0;
            setTimeout(() => {
                nextSequence();
            }, 1000);

        }


    }
})

//Gameover and restart the game
function Gameover() {
    if (level != 0) {
        playSound("wrong");
        level = 0;
        $("h1").html("GAMEOVER! press a to retry");
        userClickedPattern = [];
        gamePattern = [];
    }
}

//Play sounds and animation when pressing on a button
$(".btn").click(function () {
    if (level != 0) {
        $(this).addClass("pressed");
        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 50);
        playSound($(this).attr("id"));
    }
})

//function for the sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//The start of the game
$(document).keydown(function (event) {
    if ((event.key === "a") && (level === 0)) {
        nextSequence();
    }
})
