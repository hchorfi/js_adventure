'use strict';
//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
//const current0El = document.querySelector('#current--0');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting value nd condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

const switshPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//rolling dice func
btnRoll.addEventListener('click', function() {
    if (playing) {
        //generate randome dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        
        //display dice image
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        
        //check for dice 1
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switshPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            switshPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    currentScore = 0;
    activePlayer = 0;
    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#current--1').textContent = 0;
    document.querySelector('#score--0').textContent = 0;
    document.querySelector('#score--1').textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    scores[0] = 0;
    scores[1] = 0;
    playing = true;

})