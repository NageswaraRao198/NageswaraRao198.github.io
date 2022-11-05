var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var audio;
function playSound(name){
    audio=new Audio("soundsNew/" + name + ".mp3");
    audio.play();
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var patternColour=$("#"+randomChosenColour);
    patternColour.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // console.log(randomChosenColour);
    $("h1").text("Level "+level);
}
function handler(id){
    var userChosenColour=id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
}
$(".btn").on("click",function(){
    handler(this.id);
    animatePress(this.id);
    playSound(this.id);
    checkAnswer(userClickedPattern.length-1);
})
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

var started=false;
var level=0; 
$(document).on("keypress",function(){
    if(started===false){
        $("h1").text("Level "+level);
        setTimeout(() => {
            nextSequence();
        }, 200);
        started=true;
        // level++;
    }
})

function checkAnswer(currentLevel){
    // userClickedPattern=[];
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        // console.log("wrong");
        gameOver();
    }
    // console.log(userClickedPattern);
    // console.log(gamePattern);
}
function gameOver(){
    $("body").addClass("game-over");
    audio=new Audio("soundsNew/wrong.mp3");
    startOver();
    audio.play();
    // console.log("Gameover");
    $("h1").text("Game Over.Press any key to Restart!");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver(){
    started=false;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}