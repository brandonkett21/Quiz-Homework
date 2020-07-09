function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  var fiveMinutes = 60 * 5,
    display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
};

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
}

// create questions here
var questions = [
  new Question(
    "What is the process of finding errors and fixing them within a program?",
    ["Compiling", "Executing", "Debugging", "Scanning"],
    "Debugging"
  ),
  new Question(
    "What does JS stand for?",
    ["June Sixth", "Javascript", "Jordan Sneakers", "Jumbled Syntax"],
    "Javascript"
  ),
  new Question(
    "The acronym HTML stnad for what?",
    [
      "Hypertext Markup Language",
      "Hard To Manage Learning",
      "Help The Man Learn",
      "Hyper Text Making Language",
    ],
    "Hypertext Markup Language"
  ),
  new Question(
    "The acronym CSS stands for what?",
    [
      "Cascading Style Sheets",
      "Carrot Sytem Style",
      "Correlated Styling System",
      "Canvas Styling System",
    ],
    "Cascading Style Sheets"
  ),
  new Question(
    "What property do you use to set the background color of an image?",
    ["color", "background-color", "background:color", "color:background"],
    "background-color"
  ),
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
