var startBtn = document.getElementById("start");
var timerElement = document.getElementById("timeCount");
var highScoreBtn = document.getElementById("highscore");
var Name = document.getElementById("questionName");
var description = document.getElementById("description");
var answerBtnOne = document.getElementById("answer1");
var answerBtnTwo = document.getElementById("answer2");
var answerBtnThree= document.getElementById("answer3");
var answerBtnFour = document.getElementById("answer4");
var questionResponse = document.getElementById("questionResponse");
var enterInitials = document.getElementById("initialInsert");
var initialInput = document.getElementById("initials"); 
var initialSubmitBtn = document.getElementById("submit");
var highScoreBtns = document.getElementById("highScoresBtn");
var goBackBtn = document.getElementById("goBack");
var clearHighScoreBtn = document.getElementById("clearHighScores");
var HighScoreList = document.getElementById("highScoreList");

var answerButtons = document.querySelector(".answerBtns");

var timer; 
var countDown;  
var score = 0;
var highScoreArr = [];

let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answer1: "strings",
        answer2: "booleans",
        answer3: "alerts",
        answer4: "numbers",
        correctAnswer: "answer3"
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        answer1: "quotes",
        answer2: "curly brackets",
        answer3: "parenthesis",
        answer4: "square brackets",
        correctAnswer: "answer2"
    },
    {
        question: "Arrays in JavaScript can be used to store_________.",
        answer1: "numbers and strings",
        answer2: "other arrays",
        answer3: "booleans",
        answer4: "all of the above",
        correctAnswer: "answer4"
    },
    {
        question: "Stirng values must be enclosed within ______ when being assigned to variables.",
        answer1: "commas",
        answer2: "curly brackets",
        answer3: "quotes",
        answer4: "parenthesis",
        correctAnswer: "answer3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is",
        answer1: "JavaScript",
        answer2: "terminal/bash",
        answer3: "for loops",
        answer4: "console.log",
        correctAnswer: "answer4"
    },
]

var otherQuestions = questions;

function nextQuestion () {
    if (countDown > 0 && otherQuestions.length > 0){
        var randomQuestion = Math.floor(Math.random() * questions.length);
        
        questionName.textContent = questions[randomQuestion].question;
        description.textContent = "";
        answerBtnOne.textContent = questions[randomQuestion].answer1;
        answerBtnTwo.textContent = questions[randomQuestion].answer2;
        answerBtnThree.textContent = questions[randomQuestion].answer3;
        answerBtnFour.textContent = questions[randomQuestion].answer4;
        answerButtons.dataset.view = "visible";
        startBtn.dataset.view = "hidden";

        currentCorrectAnswer = questions[randomQuestion].correctAnswer;
        
        otherQuestions.splice(randomQuestion, 1);
        return currentCorrectAnswer;
    } else {
        quizOver();
    }
}


function start(){
    countDown = 100;
    
    timerClock();
    nextQuestion();
    console.log(12344)
    goBack.dataset.view = "hidden";
    clearHighScoreBtn.dataset.view = "hidden";
    enterInitials.dataset.view = "hidden";

}

answerBtnOne.addEventListener("click", function(event){
    var answerClicked = this.getAttribute("id");
    if (answerClicked === currentCorrectAnswer){
        questionResponse.textContent = "Correct!";
        score +=10;
    }else{
        questionResponse.textContent = "Wrong!";
        countDown -=5;
    }
    nextQuestion();
}
);

answerBtnTwo.addEventListener("click", function(event){
    var answerClicked = this.getAttribute("id");
    if (answerClicked === currentCorrectAnswer){
        questionResponse.textContent = "Correct!";
        score +=10;
    }else{
        questionResponse.textContent = "Wrong!";
        countDown -=5;
    }
    nextQuestion();
}
);
answerBtnThree.addEventListener("click", function(event){
    var answerClicked = this.getAttribute("id");
    if (answerClicked === currentCorrectAnswer){
        questionResponse.textContent = "Correct!";
        score +=10;
    }else{
        questionResponse.textContent = "Wrong!";
        countDown -=5;
    }
    nextQuestion();
}
);

answerBtnFour.addEventListener("click", function(event){
    var answerClicked = this.getAttribute("id");
    if (answerClicked === currentCorrectAnswer){
        questionResponse.textContent = "Correct!";
        score +=10;
    }else{
        questionResponse.textContent = "Wrong!";
        countDown -=5;
    }
    nextQuestion();
}
);

function timerClock() {
    timer = setInterval(function() {
        countDown--;
        timerElement.textContent = countDown;
        if (countDown <= 0) {
            clearInterval(timer);
            quizOver();
        }
    }, 1000);
}

function quizOver() {
    Name.textContent = "All Done!";
    description.textContent = "Your final score is: " + score;
    enterInitials.dataset.view = "visible";
    answerButtons.dataset.view = "hidden";
    questionResponse.textContent = "";
}

function updateHighScore(){
    var highScore = {
            name: initialInput.value.trim(),
            score: score
        };
    localStorage.setItem("highScore", JSON.stringify(highScore));
    highScoreArr.splice(highScoreArr, highScore);
    console.log(highScoreArr, " this is the high score array");
    highScoreScreen();
    listHighScores();
}

function listHighScores() {
    for (var i = 0; i < highScoreArr.length; i++) {
        var theScore = highScoreArr[i];
    
        var li = document.createElement("li");
        li.textContent = theScore;
        li.setAttribute("data-view", "visible");
        
        HighScoreList.appendChild(li);
        HighScoreList.dataset.view = "visible";
      }
}

function highScoreScreen() {
    Name.textContent =  "High Scores";
    description.textContent = "";
    enterInitials.dataset.view = "hidden";
    var storedScores = JSON.parse(localStorage.getItem("highScore"));
    if (storedScores !== null){
        highScoreArr = storedScores;
    }
    listHighScores();
    highScoreBtns.dataset.view = "visible";
    goBack.dataset.view = "visible";
    clearHighScoreBtn.dataset.view = "visible";

}


initialSubmitBtn.addEventListener("click", updateHighScore);

goBack.addEventListener("click", start);
// start quiz button that start the quiz
startBtn.addEventListener("click", start);