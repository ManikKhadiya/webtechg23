const correctSound = new Audio("../assets/sfx/correct.mp3");
const incorrectSound = new Audio("../assets/sfx/incorrect.mp3");

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/questions.json")
    .then(res => res.json())
    .then(data => {
      const quiz = data.quizzes[0]; // using first quiz
      loadQuestion(quiz.questions[currentQuestion], quiz.questions);
      startTimer(quiz.questions);
    });
});

function loadQuestion(questionObj, allQuestions) {
  document.getElementById("question").textContent = questionObj.question;
  const answersList = document.getElementById("answers");
  answersList.innerHTML = "";

  questionObj.answers.forEach(answer => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.addEventListener("click", () => handleAnswer(answer, questionObj, allQuestions));
    answersList.appendChild(li);
  });
}

function handleAnswer(selected, questionObj, allQuestions) {
    if (selected === questionObj.correct) {
      score++;
      correctSound.play();
    } else {
      incorrectSound.play();
    }
  
    currentQuestion++;
  
    if (currentQuestion < allQuestions.length) {
      setTimeout(() => loadQuestion(allQuestions[currentQuestion], allQuestions), 300);
    } else {
      setTimeout(endQuiz, 500);
    }
  }
  

function startTimer(questions) {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById("question-container").classList.add("hidden");
  const results = document.getElementById("results");
  const scoreText = document.getElementById("score-text");

  scoreText.textContent = `You scored ${score} out of ${currentQuestion}`;
  results.classList.remove("hidden");
}

/* incase above code faisl
const quizData = [];
fetch("data/questions.json")
  .then(response => response.json())
  .then(data => (quizData.push(...data), loadQuestion()));

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    showResultsPage();
    return;
  }

  const quiz = quizData[currentQuestionIndex];
  document.getElementById("quiz-question").innerText = quiz.question;

  document.querySelectorAll(".quiz-option").forEach((button, index) => {
    button.innerText = quiz.options[index];
    button.classList.remove("correct", "wrong");
  });
}

function submitAnswer(index) {
  const quiz = quizData[currentQuestionIndex];
  if (index === quiz.correct) {
    score++;
  }
  currentQuestionIndex++;
  loadQuestion();
}

const quizData = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
    { question: "Which planet is closest to the sun?", options: ["Earth", "Venus", "Mercury", "Mars"], correct: 2 },
    { question: "What is 5 + 3?", options: ["5", "8", "10", "3"], correct: 1 }
];

let currentQuestionIndex = 0;
let score = 0;

// Load the first question
document.addEventListener("DOMContentLoaded", loadQuestion);

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        document.querySelector(".quiz-container").innerHTML = `<h1>Quiz Completed!</h1><p>Your score: ${score}/${quizData.length}</p>`;
        return;
    }

    const quiz = quizData[currentQuestionIndex];
    document.getElementById("quiz-question").innerText = quiz.question;

    document.querySelectorAll(".quiz-option").forEach((button, index) => {
        button.innerText = quiz.options[index];
        button.classList.remove("correct", "wrong");
        button.disabled = false;
    });

    updateProgress();
}

// Handle answer submission
function submitAnswer(index) {
    const quiz = quizData[currentQuestionIndex];

    if (index === quiz.correct) {
        document.querySelectorAll(".quiz-option")[index].classList.add("correct");
        score++;
    } else {
        document.querySelectorAll(".quiz-option")[index].classList.add("wrong");
    }

    setTimeout(nextQuestion, 1000);
}

// Load the next question
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Update progress bar
function updateProgress() {
    const progress = document.querySelector(".progress");
    const percentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progress.style.width = percentage + "%";
}

// Handle keyboard navigation
document.addEventListener("keydown", (event) => {
    const options = document.querySelectorAll(".quiz-option");

    if (event.key >= "1" && event.key <= "4") {
        submitAnswer(parseInt(event.key) - 1);
    }

    if (event.key === "Enter") {
        nextQuestion();
    }

    if (event.key === "ArrowRight") {
        nextQuestion();
    }

    const quizData = [];
fetch("data/questions.json")
    .then(response => response.json())
    .then(data => (quizData.push(...data), loadQuestion()));

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResultsPage();
        return;
    }

    const quiz = quizData[currentQuestionIndex];
    document.getElementById("quiz-question").innerText = quiz.question;

    document.querySelectorAll(".quiz-option").forEach((button, index) => {
        button.innerText = quiz.options[index];
        button.classList.remove("correct", "wrong");
    });
}

function submitAnswer(index) {
    const quiz = quizData[currentQuestionIndex];
    if (index === quiz.correct) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

});

*/