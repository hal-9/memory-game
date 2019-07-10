/*
 * Create a list that holds all of your cards
 */

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

 shuffle(cardNames);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


let idCounter = 0;

for (cardName of cardNames) {
  idCounter += 1;
  const deck = document.getElementsByClassName('deck')[0];
  const icon = document.createElement('i');
  icon.classList.add('fa', cardName);
  const listElement = document.createElement('li');
  listElement.appendChild(icon);
  listElement.classList.add('card');
  listElement.setAttribute('id', idCounter);
  deck.appendChild(listElement);

  //deck.appendChild(karten in form von list items - in list items ein i tag)

  /*let symbol = .createElement('li');
  document.getElementByClassName('')
  console.log('symbol');
  */
}

let openCards = [];
// array where currently open cards are stored

let matchedCards = [];
// array where all matched cards are stored

const cards = document.querySelectorAll('.card');
// all cards in a variable

let timeoutID;

function resetOpenCards() {
  for (let openCard of openCards) {
    openCard.classList.remove('open', 'show')
    openCards = [];
    // close cards and empty array of openCards
  }
}

function click (card, ) {
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
}

for (let card of cards) {
  card.addEventListener('click', function() {click(card)});
  // function passes card into the click function
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
