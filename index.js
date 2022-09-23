let buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern=[];
let level =0;
let started = false;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
})


$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    //level++;
    $("#level-title").text("level "+level);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },100);
        }
    }
    else{
       gameOver();
    }
}


function nextSequence(){
    userClickedPattern=[];
    level++;

    let randomNumber = Math.floor(Math.random()*4);

    let randomChooseColor= buttonColors[randomNumber];
    gamePattern.push(randomChooseColor)

    $("#"+randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChooseColor);
   
}

function gameOver(){
    $("body").addClass("game-over");
    playSound("wrong")
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200)
    
    gamePattern=[];
    started=false;
    level=0;
}

function playSound(name){
   new Audio("sounds/"+name+".mp3").play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100)
}