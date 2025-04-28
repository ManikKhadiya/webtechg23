// src/scripts/quiz.js

//this is for the leaderboard
import { saveScore } from './leaderboard.js';

//vars
let currentQuizKey; //for leaderborad quiz id, make this work if you can pls

document.addEventListener("DOMContentLoaded", () => {
  let questionsData = null;
  fetch('../data/questions.json')
    .then(r => {
      if (!r.ok) throw new Error(`Loading JSON failed: ${r.status}`);
      return r.json();
    })
    .then(data => {
      questionsData = data;
      initQuiz();
    })
    .catch(err => console.error(err));

  // DOM references
  const heroCont = document.getElementById('hero-container');
  const selectionCont = document.getElementById('quiz-selection-container');
  const quizOptCont = document.getElementById('quiz-options-container');
  const quizOpt = document.getElementById('quiz-options');
  const quizCont = document.getElementById('quiz-container');
  const resultsCont = document.getElementById('results-container');
  const timerDisp = document.getElementById('question-timer');
  const QuesTxt = document.getElementById('question-text');
  const ansList = document.getElementById('answer-list');
  const skipBtn = document.getElementById('skip-button');
  const retryBtn = document.getElementById('retry-button');
  const scoreSpan = document.getElementById('score');

  // sfx
  const correctSnd = new Audio('../assets/sfx/correct.mp3');
  const wrongSnd = new Audio('../assets/sfx/incorrect.mp3');
  const passSnd = new Audio('../assets/sfx/pass.mp3');
  const failSnd = new Audio('../assets/sfx/fail.mp3');

  // expose sfx for accessibility.js
  window.sfxList = [ correctSnd, wrongSnd, passSnd, failSnd ];

  let questions = [], idx = 0, score = 0, timerId;
  const timeLimit = 10;

  //saving volume to local storage
  const savedVol = parseFloat(localStorage.getItem('sfxVol'));
  if (!isNaN(savedVol)) {
    window.sfxList.forEach(a => a.volume = savedVol);
  }
  
  function initQuiz() {
    showOptions();
    retryBtn.addEventListener('click', () => {
      resetFlow();
      showOptions();
    });

    const randBtn = document.getElementById('random-quiz-btn');
    if (randBtn) {
      randBtn.addEventListener('click', () => {
        // pick a random quiz
        const keys = Object.keys(questionsData);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        // start that quiz
        startQuiz(randomKey);
      });
    }

    skipBtn.addEventListener('click', () => {
      clearInterval(timerId);
      answer(false); //next question(wrong, update fidelity later)
    });
    
  }

  function showOptions() {
    selectionCont.classList.remove('hidden');
    quizCont.classList.add('hidden');
    resultsCont.classList.add('hidden');
    quizOpt.innerHTML = '';
    Object.keys(questionsData).forEach(key => {
      const qz = questionsData[key];
      const btn = document.createElement('button');
      btn.className = 'quiz-options';
      btn.textContent = key;
      btn.title = qz.description;
      btn.onclick = () => startQuiz(key);
      quizOpt.appendChild(btn);
    });
  }

  function startQuiz(key) {
    currentQuizKey = key;
    questions = questionsData[key].questions;
    idx = 0; score = 0;
    heroCont.classList.add('hidden');
    selectionCont.classList.add('hidden');
    quizCont.classList.remove('hidden');
    showQuestion();
  }

  function showQuestion() {
    if (idx >= questions.length) return showResults();
    const q = questions[idx];
    QuesTxt.textContent = q.question;
    ansList.innerHTML = '';
    q.answers.forEach(opt => {
      const li = document.createElement('li');
      const b  = document.createElement('button');
      b.textContent = opt;
      b.onclick = () => answer(opt === q.correct);
      li.appendChild(b);
      ansList.appendChild(li);
    });
    startTimer();
  }

  function startTimer() {
    let t = timeLimit;
    timerDisp.textContent = `Time: ${t}s`;
    clearInterval(timerId);
    timerId = setInterval(() => {
      t--;
      timerDisp.textContent = `Time: ${t}s`;
      if (t <= 0) {
        clearInterval(timerId);
        answer(false);
      }
    }, 1000);
  }

  function answer(isRight) {
    clearInterval(timerId);
    if (isRight) { score++; correctSnd.play(); }
    else { wrongSnd.play(); }
    idx++;
    setTimeout(showQuestion, 500);
  }

  function showResults() {
    quizCont.classList.add('hidden');
    resultsCont.classList.remove('hidden');
    scoreSpan.textContent = `${score}/${questions.length}`;
    const pct = (score / questions.length) * 100;
    (pct >= 50 ? passSnd : failSnd).play();
    //save score to leaderboard
    // saveScore(score, quizKey)
    saveScore(score, currentQuizKey); //test, probs cahnge back
    setTimeout(() => {
      window.location.href = 'leaderboard.html';
    }, 1000);
  }

  function sfxStop() {
    correctSnd.pause(); correctSnd.currentTime = 0;
    wrongSnd.pause(); wrongSnd.currentTime = 0;
    passSnd.pause(); passSnd.currentTime = 0;
    failSnd.pause(); failSnd.currentTime = 0;
  }

  function resetFlow() {
    clearInterval(timerId);
    sfxStop();
    heroCont.classList.remove('hidden');
    selectionCont.classList.remove('hidden');
    quizCont.classList.add('hidden');
    resultsCont.classList.add('hidden');
  }
});