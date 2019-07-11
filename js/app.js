 // all cards stored in an array
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
 }
 // shuffle function to randomly generate order of cards
 shuffle(cardNames);


// variable with initial id count
let idCounter = 0;

// the entire deck
const deck = document.querySelector('.deck');

for (cardName of cardNames) {
  idCounter += 1; // give different id number to every card
  const icon = document.createElement('i');
  icon.classList.add('fa', cardName); // add complete name of the class
  const listElement = document.createElement('li');
  listElement.appendChild(icon);
  listElement.classList.add('card'); // add class card to all cards
  listElement.setAttribute('id', idCounter); // give all cards an id
  deck.appendChild(listElement); // add complete elements to the deck
}

let openCards = [];
// array where currently open cards are stored

let matchedCards = [];
// array where all matched cards are stored

const cards = document.querySelectorAll('.card');
// all cards in a variable

let timeoutID;
// make a global timeoutID varibale to assign an ID later on

let allClicks = 0;
// click counter variable


function resetOpenCards() {
  for (let openCard of openCards) {
    openCard.classList.remove('open', 'show')
    openCards = [];
    // close cards and empty array of openCards
  }
}

function click (card) {
  // check if the same card is clicked twice
  if (openCards.length > 0) {
    let firstCardId = openCards[0].getAttribute('id');
    let secondCardId = card.getAttribute('id');
    if (firstCardId === secondCardId) {
      return;
    }
  }

  // user has clicked on one of the cards
  if (openCards.length < 2) {
    openCards.push(card);
    card.classList.add('open', 'show');
    // card was pushed in openCards array and card was opened
    if (openCards.length === 2) {
      // count the click
      moveCounter();
      // 2 cards are already opened
      let firstCard = openCards[0].querySelector('i').classList.item(1);
      let secondCard = openCards[1].querySelector('i').classList.item(1);
      // card content put in a variable
      if (firstCard === secondCard) {
        // both cards match
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        matchedCards.push(firstCard, secondCard);
        openCards = [];
        // check if all cards are matched
        if (matchedCards.length === 16){
          // winning screen
          console.log('Game Over');
        }
      }
      else {
        // cards are NOT matching
         timeoutID = setTimeout(function() {
          // delay the closing of the cards
          resetOpenCards();
        }, 3000);
      }
    }
  }
  else {
    clearTimeout(timeoutID);
    resetOpenCards();
    openCards.push(card);
    card.classList.add('open', 'show');
  }
}

for (let card of cards) {
  card.addEventListener('click', function() {click(card)});
  // function passes card into the click function
}

const restart = document.querySelector('.fa-repeat');

restart.addEventListener('click', function() {
  console.log('event listener fired');
  openCards = [];
  matchedCards = [];
  shuffle(cardNames);
});

function moveCounter() {
  allClicks +=1;
  document.getElementsByClassName('moves')[0].innerText = allClicks;
};


/*
 *    - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
