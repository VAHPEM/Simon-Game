var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var gamePatternIndex = 0
var gameStart = false
var scoreBoard = 1
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    makeSounds(randomChosenColor)
}
$(document).keydown(function(event){
    if (event.key === "a" && gameStart === false) {
        nextSequence()
        gameStart = true
        $("h1").html("Level: " + scoreBoard)
    }
    else if (gameStart === true && $("h1").text() === "Game Over! Press any key to restart.") {
        gameReset()
    }
})
$(".btn").click(function(){
    $(this).fadeIn(100).fadeOut(100).fadeIn(100)
    if ($(this).attr("id") === gamePattern[gamePatternIndex] && gameStart === true) {
        makeSounds($(this).attr("id"))
        gamePatternIndex++
        if (gamePatternIndex === gamePattern.length) {
            setTimeout(nextSequence, 1000)
            gamePatternIndex = 0
            scoreBoard++
            $("h1").text("Level: " + scoreBoard)
        }
    }
    else if ($(this).attr("id") !== gamePattern[gamePatternIndex] && gameStart === true) {
        $("body").css("background-color", "red")
        makeSounds("wrong")
        setTimeout(function () {
            $("body").css("background-color", "#011F3F")}, 500
        )
        gameReset()
        $("h1").text("Game Over! Press any key to restart.")
    }
})

function makeSounds(key) {
    switch (key) {
        case "blue":
            var audio0 = new Audio("./sounds/blue.mp3")
            audio0.play()
        break;
        case "green":
            var audio1 = new Audio("./sounds/green.mp3")
            audio1.play()
        break;
        case "red":
            var audio2 = new Audio("./sounds/red.mp3")
            audio2.play()
        break;
        case "yellow":
            var audio3 = new Audio("./sounds/yellow.mp3")
            audio3.play()
        break;
        case "wrong":
            var audio4 = new Audio("./sounds/wrong.mp3")
            audio4.play()
        break;
        default:console.log(key)
    }
}
function gameReset() {
    gamePattern = []
    gamePatternIndex = 0
    gameStart = false
    scoreBoard = 1
    $("h1").text("Press A Key to Start")
}