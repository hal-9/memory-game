/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

let openCards = [];
// array where open cards are stored

const cards = document.querySelectorAll('.card');
// all cards in a variable

for (let card of cards) {
  card.addEventListener('click', function () {
      // user has clicked on one of the cards
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
          }

        else {
          // cards are NOT matching
          setTimeout(function() {
          // delay the closing of the cards
          for (let openCard of openCards) {
            console.log('else fired');
            openCard.classList.remove('open', 'show')
            openCards = [];
            // close cards and empty array of openCards
              }
            }, 1000);
          }
        }
        else {

        }
      });
    };
/*
when player clicks a card => check if nr of open cards is less than 2
  if true = open card - if false = close all open cards and empty array


*/
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
