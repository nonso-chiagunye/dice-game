'use strict';

const newGameElement = document.querySelector('.btn--new');
const rollDiceElement = document.querySelector('.btn--roll');
const holdElement = document.querySelector('.btn--hold');
const score0Elemant = document.getElementById('score--0');
const score1Elemant = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceImage = document.querySelector('.dice');
const playerOne = document.getElementById('name--0');
const playerTwo = document.getElementById('name--1');
const playerSection0 = document.querySelector('.player--0');
const playerSection1 = document.querySelector('.player--1');

let score, currentScore, activePlayer, playing;

const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  diceImage.classList.add('hidden');
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  playerSection0.classList.remove('player--winner');
  playerSection1.classList.remove('player--winner');
  playerSection0.classList.add('player--active');
  playerSection1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerSection0.classList.toggle('player--active');
  playerSection1.classList.toggle('player--active');
};

rollDiceElement.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // let currentScore1 = 0;
    diceImage.src = `dice-${dice}.png`;
    diceImage.classList.remove('hidden');

    if (dice !== 1) {
      currentScore = currentScore + dice;
      // currentScore0El.textContent = currentScore0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // currentScore = 0;

      switchPlayer();

      // currentScore0El.textContent = currentScore0;
    }
  }
});

holdElement.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      diceImage.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameElement.addEventListener('click', init);
