import { consoleBank } from '../../data/consoleBank.js';

const input = document.getElementById('answer-input');
const timeDisplay = document.getElementById('time-display');
const resultsDiv = document.getElementById('results');
const matchedList = document.getElementById('matched-list');
const restartBtn = document.getElementById('restart');

let timeLeft;
let timerId;
const matched = new Set();

function flash(element, correct) {
	const cls = correct ? 'flash-correct' : 'flash-incorrect';
	element.classList.add(cls);
	setTimeout(() => element.classList.remove(cls), 500);
	}

function normalize(str) {
	return str.trim().toLowerCase();
	}

function checkAnswer(answer) {
const norm = normalize(answer);
		for (const c of consoleBank) {
		const full = normalize(c.manufacturer + ' ' + c.name);
		const nameOnly = normalize(c.name);
		if ((norm === full || norm === nameOnly) && !matched.has(full)) {
		  matched.add(full);
		  return `${c.manufacturer} ${c.name}`;
		}}
	return null;
	}

function endQuiz() {
	clearInterval(timerId);
	input.disabled = true;
	resultsDiv.innerHTML = `
	<h3>Time's up!</h3>
	<p>You named ${matched.size} of ${consoleBank.length} consoles.</p>
	`;
	restartBtn.style.display = 'inline-block';
	}

function startQuiz() {
	matched.clear();
	matchedList.innerHTML = '';
	resultsDiv.innerHTML = '';
	input.disabled = false;
	restartBtn.style.display = 'none';
	input.value = '';
	input.focus();

	timeLeft = 90;
	timeDisplay.textContent = timeLeft;
	clearInterval(timerId);
	timerId = setInterval(() => {
		timeLeft -= 1;
		timeDisplay.textContent = timeLeft;
		if (timeLeft <= 0) endQuiz();
		}, 1000);
	}

restartBtn.addEventListener('click', startQuiz);
input.addEventListener('keydown', e => {
	if (e.key === 'Enter' && timeLeft > 0) {
		const value = input.value.trim();
		if (!value) return;
		const result = checkAnswer(value);
		const correct = result !== null;
		flash(input, correct);
		if (correct) {
		  const li = document.createElement('li');
		  li.textContent = result;
		  matchedList.appendChild(li);
		}
		input.value = '';
		}
});

startQuiz();
