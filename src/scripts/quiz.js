import questionsData from '../data/questions.json' assert { type: "json" };

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLimit = 15;

const quizOptions = document.getElementById("quiz-options");
const quizSelection = document.getElementById("quiz-selection");
const quizArea = document.getElementById("quiz-area");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const questionTimer = document.getElementById("question-timer");
const resultsSection = document.getElementById("quiz-results");
const scoreDisplay = document.getElementById("score");
const skipButton = document.getElementById("skip-button");

const correctSound = new Audio("../assets/sfx/correct.mp3");
const incorrectSound = new Audio("../assets/sfx/wrong_buzzer.mp3");
const resultPassSound = new Audio("../assets/sfx/pass.mp3");
const resultFailSound = new Audio("../assets/sfx/worng.mp3");

function showQuizMenu() {
    for (const [quizTitle, quiz] of Object.entries(questionsData)) {
        const button = document.createElement("button");
        button.className = "quiz-option";
        button.textContent = quizTitle;
        button.title = quiz.description;
        button.onclick = () => startQuiz(quizTitle);
        quizOptions.appendChild(button);
    }
}

function startQuiz(title) {
    currentQuiz = questionsData[title].questions;
    currentQuestionIndex = 0;
    score = 0;
    quizSelection.classList.add("hidden");
    quizArea.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuiz.length) {
        return showResults();
    }

    const currentQuestion = currentQuiz[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answerList.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => handleAnswer(answer === currentQuestion.correct);
        li.appendChild(btn);
        answerList.appendChild(li);
    });

    startTimer();
}

function startTimer() {
    let timeLeft = timeLimit;
    questionTimer.textContent = `Time Left: ${timeLeft}s`;

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        questionTimer.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleAnswer(false); // Time out is incorrect
        }
    }, 1000);
}

function handleAnswer(isCorrect) {
    clearInterval(timer);
    if (isCorrect) {
        score++;
        correctSound.play();
    } else {
        incorrectSound.play();
    }
    currentQuestionIndex++;
    setTimeout(showQuestion, 1000);
}

function showResults() {
    quizArea.classList.add("hidden");
    resultsSection.classList.remove("hidden");
    scoreDisplay.textContent = `${score}/${currentQuiz.length}`;
    const percent = (score / currentQuiz.length) * 100;

    if (percent >= 50) {
        resultPassSound.play();
    } else {
        resultFailSound.play();
    }
}

skipButton.addEventListener("click", () => {
    clearInterval(timer);
    handleAnswer(false); // Treat skip as incorrect
});

showQuizMenu();


let selectedQuiz = null;

document.addEventListener("DOMContentLoaded", () => {
    const selectionContainer = document.getElementById("quiz-selection");
    const quizContainer = document.getElementById("quiz-container");

    if (selectionContainer) {
        const quizzes = [
            {
                title: "CS:GO Map Knowledge",
                key: "map_knowledge",
                description: "Test your knowledge of popular CS:GO maps!"
            },
            {
                title: "CS:GO Weapons",
                key: "weapons",
                description: "How well do you know your arsenal?"
            },
            {
                title: "CS:GO Pro Scene",
                key: "pro_scene",
                description: "Are you up to date with CS:GO esports?"
            },
            {
                title: "Fun Facts",
                key: "fun_facts",
                description: "Fun and obscure trivia about CS:GO."
            }
        ];

        quizzes.forEach(quiz => {
            const button = document.createElement("div");
            button.className = "quiz-option";
            button.textContent = quiz.title;
            button.dataset.description = quiz.description;
            button.addEventListener("click", () => {
                selectedQuiz = quiz.key;
                startQuiz();
            });
            selectionContainer.appendChild(button);
        });
    }
});

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