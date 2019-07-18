const cardNames = [
  'fa-diamond', 'fa-diamond',
  'fa-bomb', 'fa-bomb',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle'
];

// the entire deck
const deck = document.querySelector('.deck');

// check if the game has started
let gameStarted = false;

// array where currently open cards are stored
let openCards;

// array where all matched cards are stored
let matchedCards;

// make a global timeoutID varibale to assign an ID later on
let timeoutID;

// click counter variable
let allClicks;

// interval variable to store and cancel timer
let intervalID;

// star rating in numbers
let starRating = 3;

// the winning screen popup/modal
const modal = document.getElementById('winningScreen');

// repeat button in-game
const restart = document.querySelector('.fa-repeat');

// repeat button on winning-screen
const winningScreenRestart = document.querySelector('.restartButton');

// timer while game is running
let displayTimer = 0;

// variable with initial id count
let idCounter = 0;

function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;
   while (currentIndex !== 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }
   return array;
};

function resetOpenCards() {
  // cards do not match, so close all open cards
  for (let openCard of openCards) {
    openCard.classList.remove('open', 'show')
    openCards = [];
  }
};

function changeCardToOpen (card) {
  openCards.push(card);
  card.classList.add('open', 'show');
};

function matchCards (firstCard, secondCard) {
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  matchedCards.push(firstCard, secondCard);
  openCards = [];
  // check if all cards are matched
  if (matchedCards.length === 16){
    // winning screen
    timeoutID = setTimeout(function() {
    gameEnd();}, 1000);
  }
};

function raiseTimer() {
  displayTimer += 1;
  document.getElementsByClassName('timer')[0].innerText = displayTimer;
};

function click (card) {
  if (gameStarted === false) {
    // when first click -> start timer
    intervalID = window.setInterval(raiseTimer, 1000);
    gameStarted = true;
  }

  // user has clicked on one of the cards
  // check if the same card is clicked twice
  if (openCards.length > 0) {
    let firstCardId = openCards[0].getAttribute('id');
    let secondCardId = card.getAttribute('id');
    if (firstCardId === secondCardId) {
      return;
    }
  }

  // two different cards have been clicked
  if (openCards.length < 2) {
    changeCardToOpen(card);
    // card was pushed in openCards array and card was opened
    if (openCards.length === 2) {
      // two cards are open
      // check for star rating threshholds
      if (allClicks === 12) {
        document.querySelectorAll('.fa-star')[2].classList.add('fa-star-o');
        starRating -= 1;
      }
      if (allClicks === 20) {
        document.querySelectorAll('.fa-star')[1].classList.add('fa-star-o');
        starRating -= 1;
      }
      if (allClicks === 26) {
        starRating -= 1;
        document.querySelectorAll('.fa-star')[0].classList.add('fa-star-o');
      }
      // count the click
      raiseMoveCounter();
      // card content put in a variable
      let firstCard = openCards[0].querySelector('i').classList.item(1);
      let secondCard = openCards[1].querySelector('i').classList.item(1);
      if (firstCard === secondCard) {
        // both cards match
        matchCards(firstCard, secondCard);
        }
      else {
        // cards are NOT matching
         timeoutID = setTimeout(function() {
          // delay the closing of the cards
          resetOpenCards();
        }, 1000);
      }
    }
  }
  else {
    clearTimeout(timeoutID);
    resetOpenCards();
    openCards.push(card);
    card.classList.add('open', 'show');
  }
};

function addClicks(cards) {
  for (let card of cards) {
    card.addEventListener('click', function() {click(card)});
    // function passes card into the click function
  }
};

function raiseMoveCounter() {
  // count the player moves
  allClicks +=1;
  document.getElementsByClassName('moves')[0].innerText = allClicks;
};

function startNewGame() {
  // empty all arrays and reset
  allListItems = document.querySelector('.deck');
  allListItems.innerHTML = '';
  displayTimer = 0;
  document.getElementsByClassName('timer')[0].innerText = 0;
  openCards = [];
  idCounter = 0;
  matchedCards = [];
  allClicks = 0;
  starRating = 3;
  // clear moves counter and star rating
  document.getElementsByClassName('moves')[1].innerText = 0;
  document.getElementsByClassName('moves')[0].innerText = 0;
  document.querySelectorAll('.fa-star').forEach(function(star) {
    star.classList.remove('fa-star-o');
  });
  shuffle(cardNames);
  for (cardName of cardNames) {
    // iterate over every card and add all atributes
    idCounter += 1; // give different id number to every card
    const icon = document.createElement('i');
    icon.classList.add('fa', cardName); // add complete name of the class
    const listElement = document.createElement('li');
    listElement.appendChild(icon);
    listElement.classList.add('card'); // add class card to all cards
    listElement.setAttribute('id', idCounter); // give all cards an id
    deck.appendChild(listElement); // add complete elements to the deck
  }
  const cards = document.querySelectorAll('.card');
  // all cards in a variable
  addClicks(cards);
};

function gameEnd() {
  // all cards have been matched and game ends
  document.querySelector('.rating').innerText = starRating;
  document.getElementsByClassName('moves')[1].innerText = allClicks;
  document.querySelector('.seconds').innerText = displayTimer;
  clearInterval(intervalID);
  modal.style.display = "block";
};

// click listener on restart button
restart.addEventListener('click', function() {
  gameStarted = false;
  clearInterval(intervalID);
  // restart the game
  startNewGame();
});

winningScreenRestart.addEventListener('click', function() {
  // click listener on restartButton
  // get rid of the winning screen
  modal.style.display = "none";
  gameStarted = false;
  startNewGame();
});

startNewGame();
