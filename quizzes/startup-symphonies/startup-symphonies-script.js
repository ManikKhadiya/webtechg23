import { consoleBank } from '../../data/consoleBank.js';

const allQuestions = consoleBank.filter(c => c.videoID);

let player,
quizContainer,
qNumEl,
playBtn,
optsEl,
initialMarkup = null,
questions, 
currentIdx,
score;


function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '0',
		width: '0',
		events: { onReady: initQuiz }
		});
	}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;


function initQuiz() {
	quizContainer = document.getElementById('quiz-container');

	if (!initialMarkup) {
		initialMarkup = quizContainer.innerHTML;
		} else {
			quizContainer.innerHTML = initialMarkup;
			}

	qNumEl  = document.getElementById('question-number');
	playBtn = document.getElementById('play-button');
	optsEl  = document.getElementById('cards');

	questions  = shuffle(allQuestions).slice(0, 10);
	currentIdx = 0;
	score      = 0;

	showQuestion();
	}

function shuffle(arr) {
	return arr
	.map(v => ({ v, r: Math.random() }))
	.sort((a, b) => a.r - b.r)
	.map(o => o.v);
	}

function showQuestion() {
		optsEl.innerHTML = '';
		playBtn.disabled = false;

		if (currentIdx >= questions.length) {
			return showResults();
			}

	const q = questions[currentIdx];
	qNumEl.textContent = `Question ${currentIdx + 1} of ${questions.length}`;

	player.loadVideoById(q.videoID);
	playBtn.onclick = () => player.playVideo();

	const timerDisplay = document.getElementById('time-display');
	let timeLeft = 15;
	timerDisplay.textContent = timeLeft;
	if (window.answerTimerId) clearInterval(window.answerTimerId);
	window.answerTimerId = setInterval(() => {
			timeLeft--;
			timerDisplay.textContent = timeLeft;
			if (timeLeft <= 0) {
			clearInterval(window.answerTimerId);
			nextQuestion();
			}
		}, 1000);

	const wrongs = shuffle(
	questions.filter(c => c.videoID !== q.videoID)
	).slice(0, 3);
	const opts = shuffle([q, ...wrongs]);


	opts.forEach(opt => {
		const card = document.createElement('div');
		card.className       = 'card';
		card.dataset.correct = opt.videoID === q.videoID;
		card.onclick         = onSelect;

		const img = document.createElement('img');
		img.src = opt.image;
		img.alt = opt.name;
		card.append(img);

		const lbl = document.createElement('div');
		lbl.textContent = opt.name;
		card.append(lbl);

		optsEl.append(card);
		});
	}


function onSelect(e) {
	clearInterval(window.answerTimerId);
	const chosen  = e.currentTarget;
	const correct = chosen.dataset.correct === 'true';
	if (correct) score++;


	document.querySelectorAll('.card').forEach(c => {
		c.onclick = null;
		c.classList.add(
		c.dataset.correct === 'true' ? 'correct' : 'incorrect'
		);
		});

	playBtn.disabled = true;

	setTimeout(() => {
		currentIdx++;
		showQuestion();
		}, 1000);
	}

function nextQuestion() {
	currentIdx++;
	showQuestion();
	}

function showResults() {
	quizContainer.innerHTML = `
	<div class="results">
	<h2>Your score: ${score} / ${questions.length}</h2>
	<div id="controls">
	<button class="btn" id="restart-button">Play Again</button>
	</div>
	</div>
	`;
	document
	.getElementById('restart-button')
	.addEventListener('click', initQuiz);
	}
