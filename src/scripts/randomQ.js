function startRandomQuiz() {
    const quizzes = ["index.html", "index.html", "index.html", "index.html"]; //replace with actual names of files
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    window.location.href = randomQuiz;
}