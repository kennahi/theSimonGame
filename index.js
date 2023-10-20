// Global variables
var userClickedPattern = [];                               //the pattern of the user
var buttonColors = ["red", "blue", "green", "yellow"];     //an array of the available colors
var gamePattern = [];                                      //the pattern of the game
var level = 0;                                             //the level of the game
var playerTurn = 0;                                        //checks whether its the player's turn or not (0 or 1)
var count = 1;                                             //checks how many times the user has to press the buttons

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

//Gameover and restart the game
function Gameover() {
    if (level != 0) {
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        level = 0;
        $("h1").html("GAMEOVER! press a to retry");
        userClickedPattern = [];
        gamePattern = [];
    }
}

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