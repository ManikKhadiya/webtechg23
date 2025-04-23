import { consoleBank } from '../../data/consoleBank.js';

const total = 10;
let selected;
const slotsEl = document.getElementById('slots');
const cardsEl = document.getElementById('cards');
const checkBtn = document.getElementById('check');
const restartBtn = document.getElementById('restart');
const resultEl = document.getElementById('result');

function init() {
	selected = [...consoleBank].sort(() => 0.5 - Math.random()).slice(0, total);
	const manufacturers = selected.map(c => c.manufacturer).sort(() => 0.5 - Math.random());

	slotsEl.innerHTML = '';
	manufacturers.forEach(man => {
		const slot = document.createElement('div');
		slot.className = 'slot';
		slot.dataset.manufacturer = man;
		slot.addEventListener('dragover', e => e.preventDefault());
		slot.addEventListener('drop', onDrop);
		slotsEl.append(slot);
		});

	cardsEl.innerHTML = '';
	selected.sort(() => 0.5 - Math.random()).forEach(c => {
		const card = document.createElement('div');
		card.className = 'card';
		card.draggable = true;
		card.dataset.manufacturer = c.manufacturer;
		card.addEventListener('dragstart', onDragStart);

		const img = document.createElement('img');
		img.src = c.image;
		img.alt = c.name;
		img.draggable = false;
		card.append(img);

		const label = document.createElement('div');
		label.textContent = c.name;
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
		e.currentTarget.appendChild(dragged);
		}
	}

checkBtn.addEventListener('click', () => {
	let score = 0;
	document.querySelectorAll('#slots .slot').forEach(slot => {
		const man = slot.dataset.manufacturer;
		Array.from(slot.children).forEach(child => {
			if (child.classList.contains('card')) {
				if (child.dataset.manufacturer === man) {
					  score++;
					  child.classList.add('correct');
				} else {
					  child.classList.add('incorrect');
					}
				}
			});
		});
		resultEl.textContent = `You matched ${score} out of ${total} correctly.`;
		checkBtn.disabled = true;
		});

restartBtn.addEventListener('click', init);
init();