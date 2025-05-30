let questionStartTime;

function startTimer() {
  questionStartTime = Date.now();
}

function submitAnswer(index) {
  let elapsedTime = (Date.now() - questionStartTime) / 1000;
  let quiz = quizData[currentQuestionIndex];
  let correct = index === quiz.correct;

  saveStats(correct, elapsedTime);
  correct ? score++ : null;
  nextQuestion();
}

function saveStats(correct, timeTaken) {
  let stats = JSON.parse(localStorage.getItem("quizStats")) || [];
  stats.push({ correct, timeTaken });
  localStorage.setItem("quizStats", JSON.stringify(stats));
}