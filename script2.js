// select the elements we need
const start = document.querySelector('#start-btn');
const render = document.querySelector('#time');
const question = document.querySelector('#question');
const choiceA = document.querySelector('#a');
const choiceB = document.querySelector('#b');
const choiceC = document.querySelector('#c');
const choiceD = document.querySelector('#d');
let scoreDiv = document.querySelector("#scoreContainer");
let scoreList = document.querySelector("#highscores");
let restart = document.querySelector("#restart");
let highscores = [];
// create quiz questions
const questions = [{
    question: "Who is the god of the sea?",
    choiceA: "Poseidon",
    choiceB: "Ares",
    choiceC: "Zues",
    choiceD: "Hades",
    answer: "a"
}, {
    question: "What is Ares the god of?",
    choiceA: "Love",
    choiceB: "Wisdom",
    choiceC: "The Underworld",
    choiceD: "War",
    answer: "d"
}, {
    question: "Who did Hades kidnap and force to be his wife?",
    choiceA: "Athena",
    choiceB: "Persephone",
    choiceC: "Hera",
    choiceD: "Demeter",
    answer: "b"
}, {
    question: "Who is the father of Zues, Hades, and Poseidon?",
    choiceA: "Thea",
    choiceB: "Gaea",
    choiceC: "Cronus",
    choiceD: "Hyperion",
    answer: "c"
}, {
    question: "Who crafts the weapons of the gods?",
    choiceA: "Ares",
    choiceB: "Hephaestus",
    choiceC: "Helios",
    choiceD: "Perseus",
    answer: "b"
}
];
// create variables
let timeLimit = 60;
let begin = 0;
let curQuestion = begin;
//const lastQuestion = questions.length - 1;
const lastQuestion = questions.length;
let TIMER;
start.addEventListener('click', startQuiz);
function startQuiz() {
    score = 0;
    showQuestions();
    startTimer(timeLimit, render);
}
// dynamically load questions
function showQuestions() {
    let q = questions[curQuestion];
    // replace html element values with array values
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}
// check answer against array values
function check(answer) {
    if (answer == questions[curQuestion].answer) {
        score++;
    } else {
        timeLeft -= 10;
        //updateTimer(timeLeft);
    }
    count = 0;
    curQuestion++;
    // check if the the last question based on array length otherwise end execution
    if (curQuestion < lastQuestion) {
        showQuestions();
    } else {
        // end the execution here
        clearInterval(TIMER);
        showScore();
    }
}
// timer functions
function startTimer(duration, display) {
    console.log('NOTICE: timer started');
    timeLeft = duration;
    resetTimer = setInterval(function () {
        //if ((timeLeft-1) >= 0) {
        if ((timeLeft - 1) >= 0) {
            console.log("NOTIC: timer is running");
            clearInterval(render);
            timeLeft--
        } else {
            console.log("NOTIC: times up");
            clearInterval(resetTimer);
            timeLeft = duration;
        }
        updateTimer(timeLeft);
    }, 1000);
}
function updateTimer(t) {
    render.textContent = t;
}
function showScore() {
    // format quiz results
    var scorePct = Math.round(100 * score / questions.length);
    var resp = "scored " + score + "/" + questions.length + " (" + scorePct + "%)";
    // return results
    console.log(resp);
    clearInterval(begin);
    var userName = prompt("Enter your initials to store score");
    highscores = JSON.parse(localStorage.getItem("highscores"));
    if (!highscores) {
        highscores = [];
    }
    highscores.push({ name: userName, score: resp });
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    for (var i = 0; i < highscores.length; i++) {
        var player = highscores[i].name + ": " + highscores[i].score;
        var li = document.createElement("li");
        li.textContent = player;
        scoreList.appendChild(li);
    }
    localStorage.setItem("highscores", JSON.stringify(highscores));
}