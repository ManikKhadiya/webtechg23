//redunts
let timeLeft = 10; //10s / q
let timer;

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion(); // autoskiop
    }
  }, 1000);
}

function loadQuestion() {
  startTimer(); //retastrs flow
}
