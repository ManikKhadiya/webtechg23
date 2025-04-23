import { consoleBank } from '../../data/consoleBank.js';

const total = 10;
let selected;

const timelineEl = document.getElementById('timeline');
const cardsEl = document.getElementById('cards');
const checkBtn = document.getElementById('check');
const restartBtn = document.getElementById('restart');
const resultEl = document.getElementById('result');

function init() {
	selected = [...consoleBank]
	.sort(() => 0.5 - Math.random())
	.slice(0, total);

	const ordered = [...selected].sort((a, b) => a.year - b.year);
	timelineEl.innerHTML = '';
	ordered.forEach(c => {
		const slot = document.createElement('div');
		slot.className = 'slot';
		slot.dataset.year = c.year;
		slot.addEventListener('dragover', e => e.preventDefault());
		slot.addEventListener('drop', onDrop);
		timelineEl.append(slot);
		});

	cardsEl.innerHTML = '';
	selected
	.sort(() => 0.5 - Math.random()).forEach(c => {
		const card = document.createElement('div');
		card.className = 'card';
		card.draggable = true;
		card.dataset.year = c.year;
		card.addEventListener('dragstart', onDragStart);

		const img = document.createElement('img');
		img.src = c.image;
		img.alt = c.name;
		img.alt = `${c.manufacturer} ${c.name}`;
		img.draggable = false;
		card.append(img);

		const label = document.createElement('div');
		label.textContent = `${c.manufacturer} ${c.name}`;
		card.append(label);

		cardsEl.append(card);
		});

	resultEl.textContent = '';
	checkBtn.disabled = false;
	}

let dragged;
function onDragStart(e) {
	dragged = e.target.closest('.card');
	e.dataTransfer.setData('text/plain', '');
	}

function onDrop(e) {
	e.preventDefault();
	if (dragged) {
		if (e.currentTarget.firstChild) {
		cardsEl.appendChild(e.currentTarget.firstChild);
		}
		e.currentTarget.appendChild(dragged);
		}
	}

checkBtn.addEventListener('click', () => {
	let score = 0;
	document.querySelectorAll('#timeline .slot').forEach(slot => {

		const year = slot.dataset.year;
		const card = slot.firstChild;

		if (card && card.dataset.year === year) {
			score++;
			card.classList.add('correct');
		} else if (card) {
			card.classList.add('incorrect');
			}
		});
		
	resultEl.textContent = `You placed ${score} out of ${total} correctly.`;
	checkBtn.disabled = true;
	});

restartBtn.addEventListener('click', init);

init();