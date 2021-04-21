'use strict';
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentPlayer0 = document.getElementById('current--0')
const currentPlayer1 = document.getElementById('current--1')
const blockPic = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, combineNum, activePlayer, playing;

const init = function (){
	activePlayer = 0;
	combineNum = 0;
	scores = [0,0];
	playing = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	currentPlayer0.textContent = 0;
	currentPlayer1.textContent = 0;

	blockPic.classList.add('hidden');
	player0E1.classList.remove('player--winner');
	player1E1.classList.remove('player--winner');
	player0E1.classList.add('player--active');
	player1E1.classList.remove('player--active');

}

init();

const switchPlayer= function(){
	document.getElementById(`current--${activePlayer}`).textContent= 0; //loses all the points when die hits 1
	activePlayer = activePlayer == 0 ? 1 : 0; //switches the players
	combineNum =0;
	player0E1.classList.toggle('player--active');//if it was player 0 turn then it will not be his turn
	player1E1.classList.toggle('player--active');//likewise with player 1.
}


blockPic.classList.add('hidden');

rollDice.addEventListener('click', function(){
	if(playing){
		let dice = Math.trunc(Math.random()*6)+1;
		blockPic.classList.remove('hidden');
		blockPic.src=`dice-${dice}.png`

		if (dice != 1){
			combineNum += dice;
			document.getElementById(`current--${activePlayer}`).textContent=combineNum;
		}
		else{
			switchPlayer();
		}
	}
})

btnHold.addEventListener('click',function(){
	if(playing){
		scores[activePlayer] += combineNum;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
		//console.log(scores[activePlayer]);

		if(scores[activePlayer] >= 100){
			playing = false;
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
			blockPic.classList.add('hidden');
		}
		else{
			switchPlayer();
		}
	}
})

btnNew.addEventListener('click',init);

