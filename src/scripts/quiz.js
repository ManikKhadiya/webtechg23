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



/* incase above code faisl


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